# FitCoach AI — دليل المشروع (Public snapshot)

هذا المستودع هو نسخة عامة مُنقّحة من مشروع "FitCoach AI" تحتوي على شفرة المصدر، السكربتات، وملفات بيانات صغيرة وعينات صوتية مناسبة للنشر العام. تم استثناء الملفات الضخمة (أوزان النماذج، ملفات فيديو/صوت الكبيرة، وبعض مجموعات البيانات الضخمة) للحفاظ على إمكانية الاستنساخ دون الحاجة إلى Git LFS.

**ماذا يحتوي هذا الريبو (عمومي):**
- واجهة المستخدم: React + Vite (ملفات `package.json` و `src/`).
- خادم بايثون: مجلد `ai_backend/` (FastAPI وملفات التشغيل).
- عينات بيانات صغيرة: موجودة داخل `ai_backend/datasets/` (انظر القسم أدناه).
- عينات صوتية قليلة (لا تشمل نماذج تدريب ضخمة).
- سكربتات مساعدة وملفات نشر (`Dockerfile`, `render.yaml`, `scripts/`).

**أين الداتا سيت؟**

- ملفّات العيّنات والداتا الصغيرة موجودة الآن في المجلد: [AI Fit Coach_publish_tmp3/ai_backend/datasets](AI Fit Coach_publish_tmp3/ai_backend/datasets)

	يمكنك استعراضها محلياً (PowerShell):

	```powershell
	Get-ChildItem -Path ai_backend\datasets | Select-Object Name,Length
	```

	أو على لينكس/ماك:

	```bash
	ls -lah ai_backend/datasets
	```

	هذه النسخة العامة تضمّ حوالي 69 ملف بيانات صغيرة (CSV, XLSX) كمجموعة أمثلة واختبار — وهي كافية لتشغيل معظم المسارات الوظيفية محلياً دون البيانات الضخمة.

**ما الذي لم يُرفع (المستثنى)؟**

- ملفات أوزان النماذج وملفات ثنائية كبيرة: `*.onnx`, `*.pt`, `*.pth`, `*.h5`, `*.pkl`, `*.ckpt`.
- أرشيفات أو ملفات ضخمة: `*.zip`, `*.tar.gz`، وملفات الفيديو الكبيرة `*.mp4`، ملفات صوتية ضخمة `*.wav`/`*.mp3` إذا تجاوزت حجمها ~50–100MB.
- دلائل/nماذج صوتية ومجلدات التدريب الكاملة مثل `ai_backend/voice_assets/` و`ai_backend/models/` إذا كانت تحتوي على ملفات كبيرة.

إذا رغبت بإضافة هذه الملفات الضخمة إلى الريبو الخاص بك لاحقاً، يمكنك:

1. رفعها إلى مساحة تخزين سحابية (S3, Google Cloud Storage, Azure Blob, Drive) ثم مزامنتها إلى المسار المحلي المشار إليه في ملف `DATASET_ROOT`.
2. أو استخدام Git LFS محلياً (`git lfs install`, `git lfs track "*.pt"`, ثم `git add` و `git lfs push --all origin main`) — لكن هذا يتطلب أن تملك الوصول إلى الملفات الحقيقية (ليست مؤشرات LFS فقط).

**كيفية تشغيل المشروع محلياً (سريع ودقيق)**

المتطلبات الموصى بها:
- Python 3.11+ (يفضل 3.11)
- Node.js 18+ و npm/yarn/pnpm
- (اختياري) Git LFS إن أردت إدارة الملفات الكبيرة عبر Git

خطوات سريعة (Windows / PowerShell):

```powershell
# 1) إعداد بيئة بايثون (conda أو venv)
conda create -n fitcoach python=3.11 -y
conda activate fitcoach

# 2) تثبيت تبعيات الباكند
pip install -r ai_backend/requirements.txt

# 3) إعداد متغيرات البيئة
Copy-Item ai_backend\.env.example ai_backend\.env
# افتح ai_backend\.env وعدّل DATASET_ROOT إذا أردت مساراً خارجياً

# 4) تشغيل الباكند
python -m uvicorn ai_backend.main:app --reload --host 127.0.0.1 --port 8000

# 5) في نافذة طرفية ثانية: تشغيل الواجهة
npm install
npm run dev
```

خطوات لينكس / ماك (باش):

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r ai_backend/requirements.txt
cp ai_backend/.env.example ai_backend/.env
python -m uvicorn ai_backend.main:app --reload --host 127.0.0.1 --port 8000
npm install
npm run dev
```

ملاحظات مهمة:
- إذا أردت أن يستخدم الخادم مجموعة بيانات خارجية، عيّن متغير `DATASET_ROOT` في `ai_backend/.env` أو في بيئة التشغيل إلى المسار الذي يحتوي على البيانات الكاملة. إذا لم تُعرّف `DATASET_ROOT` فسوف يستخدم التطبيق افتراضياً المجلد `ai_backend/datasets` (الحالي).
- بعض الحزم مثل `faiss-cpu` قد تحتاج إصدارات محددة أو حزم نظامية؛ إذا واجهت أخطاء تثبيت فابلّغني لأعطيك تعليمات خاصة بالمنصة.

**إذا رغبت بإضافة الملفات الكبيرة إلى المشروع**

أفضل نهج: ارفع الملفات الكبيرة إلى سحابة (S3/GC/Blob) ثم ضع سكربت تحميل (مثال أدناه) أو حدّث `DATASET_ROOT` للإشارة إلى الموقع المحلي بعد التنزيل.

مثال سريع لتحميل من S3 (تبدّل المسار والقناة):

```bash
aws s3 sync s3://<your-bucket>/fitcoach-datasets/ ai_backend/datasets/
```

أو باستخدام curl (ملفات فردية):

```bash
curl -L -o ai_backend/datasets/large_dataset.csv "https://example.com/large_dataset.csv"
```

بعد تنزيل الملفات الكبيرة: تأكّد أن لديك صلاحيات القراءة وأن `DATASET_ROOT` يشير إلى المسار الصحيح ثم شغّل الخادم.

**معلومات إضافية وملفات مهمة**
- إعدادات البيئة: [ai_backend/.env.example](ai_backend/.env.example)
- مجلد الداتا في الريبو: [AI Fit Coach_publish_tmp3/ai_backend/datasets](AI Fit Coach_publish_tmp3/ai_backend/datasets)
- قواعد LFS الأصلية (مُعلّقة في هذه النسخة العامة): [.gitattributes](.gitattributes)

إذا تريد، أعد ترتيب الملفات لإعادة إنشاء نفس الشجرة داخل مجلد المشروع الرئيسي `AI Fit Coach` بدلاً من `AI Fit Coach_publish_tmp3` أو أرفع بقية الملفات الصغيرة التي لم أضفها بعد. أقدر أجهّز سكربت PowerShell/ Bash لتحميل الملفات الكبيرة تلقائياً إن أعطيتني روابط التخزين.

---
إذا تحب أجهّز نسخة README إنجليزية أيضاً بصيغة توثيقية (RFC-like) أو أُدرج قائمة مفصّلة بكل ملف داتا تم تضمينه، قل لي وسأضَعها فوراً.

