import type { Exercise } from './exercises';

type SourceGender = 'female' | 'male';
type SourceLocation = 'home' | 'gym';
type SourceGoal = 'build' | 'general';
type PreferredGender = 'female' | 'male' | null;

interface LocalClip {
  file: string;
  path: string;
  gender: SourceGender;
  muscle: string;
  location: SourceLocation;
  goal: SourceGoal;
}

const FEMALE_VIDEO_FILES = [
  'Abs-advanced-female(1).mp4',
  'Abs-advanced-female(2).mp4',
  'Abs-basic-female(1).mp4',
  'Abs-basic-female(2).mp4',
  'ErectorSpinae_BackExtension_Gym_Build_Female_1.mp4',
  'ErectorSpinae_BackExtension_Gym_Build_Female_2.mp4',
  'ErectorSpinae_BarbellDeadlift_Gym_General_Female_1.mp4',
  'ErectorSpinae_BarbellDeadlift_Gym_General_Female_2.mp4',
  'ErectorSpinae_BodyweightGoodMornings_Home_Build_Female_1.mp4',
  'ErectorSpinae_BodyweightGoodMornings_Home_Build_Female_2.mp4',
  'ErectorSpinae_SupermanHold_Home_General_Female_1.mp4',
  'ErectorSpinae_SupermanHold_Home_General_Female_2.mp4',
  'Gastrocnemius_BodyweightCalfRaise_Home_Build_Female_1.mp4',
  'Gastrocnemius_BodyweightCalfRaise_Home_Build_Female_2.mp4',
  'Gastrocnemius_SmithMachineCalfRaise_Gym_Build_Female_1.mp4',
  'Gastrocnemius_SmithMachineCalfRaise_Gym_Build_Female_2.mp4',
  'GluteusMaximus_BarbellHipThrust_Gym_Build_Female_1.mp4',
  'GluteusMaximus_BarbellHipThrust_Gym_Build_Female_2.mp4',
  'GluteusMaximus_BarbellSquat_Gym_General_Female_1.mp4',
  'GluteusMaximus_BarbellSquat_Gym_General_Female_2.mp4',
  'GluteusMaximus_BodyweightWaitersBow_Home_Build_Female_1.mp4',
  'GluteusMaximus_BodyweightWaitersBow_Home_Build_Female_2.mp4',
  'GluteusMaximus_BoxJump_Home_General_Female_1.mp4',
  'GluteusMaximus_BoxJump_Home_General_Female_2.mp4',
  'GluteusMedius_BarbellSquat_Gym_General_Female_1.mp4',
  'GluteusMedius_BarbellSquat_Gym_General_Female_2.mp4',
  'GluteusMedius_MachineGluteKickback_Gym_Build_Female_1.mp4',
  'GluteusMedius_MachineGluteKickback_Gym_Build_Female_2.mp4',
  'GluteusMedius_SingleLeggedRomanianDeadlifts_Home_General_Female_1.mp4',
  'GluteusMedius_SingleLeggedRomanianDeadlifts_Home_General_Female_2.mp4',
  'Hamstrings_BarbellStiffLegDeadlifts_Gym_Build_Female_1.mp4',
  'Hamstrings_BarbellStiffLegDeadlifts_Gym_Build_Female_2.mp4',
  'Hamstrings_BodyweightWaitersBow_Home_General_Female_1.mp4',
  'Hamstrings_BodyweightWaitersBow_Home_General_Female_2.mp4',
  'Hamstrings_LandmineRomanianDeadlift_Gym_General_Female_1.mp4',
  'Hamstrings_LandmineRomanianDeadlift_Gym_General_Female_2.mp4',
  'Hamstrings_SingleLeggedRomanianDeadlifts_Home_Build_Female_1.mp4',
  'Hamstrings_SingleLeggedRomanianDeadlifts_Home_Build_Female_2.mp4',
  'LatissimusDorsi_BodyweightSupermanRow_Home_Build_Female_1.mp4',
  'LatissimusDorsi_BodyweightSupermanRow_Home_Build_Female_2.mp4',
  'LatissimusDorsi_LatPulldown_Gym_Build_Female_1.mp4',
  'LatissimusDorsi_LatPulldown_Gym_Build_Female_2.mp4',
  'LatissimusDorsi_SeatedCableRow_Gym_General_Female_1.mp4',
  'LatissimusDorsi_SeatedCableRow_Gym_General_Female_2.mp4',
  'LatissimusDorsi_SupermanHold_Home_General_Female_1.mp4',
  'LatissimusDorsi_SupermanHold_Home_General_Female_2.mp4',
  'PosteriorDeltoid_BodyweightReverseFly_Home_Build_Female_1.mp4',
  'PosteriorDeltoid_BodyweightReverseFly_Home_Build_Female_2.mp4',
  'PosteriorDeltoid_FacePull_Gym_General_Female_1.mp4',
  'PosteriorDeltoid_FacePull_Gym_General_Female_2.mp4',
  'PosteriorDeltoid_ReversePecDeck_Gym_Build_Female_1.mp4',
  'PosteriorDeltoid_ReversePecDeck_Gym_Build_Female_2.mp4',
  'PosteriorDeltoid_SupermanHold_Home_General_Female_1.mp4',
  'PosteriorDeltoid_SupermanHold_Home_General_Female_2.mp4',
  'Soleus_BodyweightCalfRaise_Home_Build_Female_1.mp4',
  'Soleus_BodyweightCalfRaise_Home_Build_Female_2.mp4',
  'Soleus_SeatedCalfRaise_Gym_Build_Female_1.mp4',
  'Soleus_SeatedCalfRaise_Gym_Build_Female_2.mp4',
  'Soleus_SmithMachineCalfRaise_Gym_General_Female_1.mp4',
  'Soleus_SmithMachineCalfRaise_Gym_General_Female_2.mp4',
  'TeresMajor_BodyweightReverseFly_Home_Build_Female_1.mp4',
  'TeresMajor_BodyweightReverseFly_Home_Build_Female_2.mp4',
  'TeresMajor_LatPulldown_Gym_Build_Female_1.mp4',
  'TeresMajor_LatPulldown_Gym_Build_Female_2.mp4',
  'TeresMajor_SeatedCableRow_Gym_General_Female_1.mp4',
  'TeresMajor_SeatedCableRow_Gym_General_Female_2.mp4',
  'TeresMajor_SupermanHold_Home_General_Female_1.mp4',
  'TeresMajor_SupermanHold_Home_General_Female_2.mp4',
  'TeresMinor_BodyweightExternalRotation_Home_Build_Female_1.mp4',
  'TeresMinor_BodyweightExternalRotation_Home_Build_Female_2.mp4',
  'TeresMinor_CableExternalRotation_Gym_Build_Female_1.mp4',
  'TeresMinor_CableExternalRotation_Gym_Build_Female_2.mp4',
  'TeresMinor_FacePull_Gym_General_Female_1.mp4',
  'TeresMinor_FacePull_Gym_General_Female_2.mp4',
  'TeresMinor_SupermanHold_Home_General_Female_1.mp4',
  'TeresMinor_SupermanHold_Home_General_Female_2.mp4',
  'Trapezius_BarbellShrug_Gym_Build_Female_1.mp4',
  'Trapezius_BarbellShrug_Gym_Build_Female_2.mp4',
  'Trapezius_BodyweightShrug_Home_Build_Female_1.mp4',
  'Trapezius_BodyweightShrug_Home_Build_Female_2.mp4',
  'Trapezius_FacePull_Gym_General_Female_1.mp4',
  'Trapezius_FacePull_Gym_General_Female_2.mp4',
  'Trapezius_SupermanHold_Home_General_Female_1.mp4',
  'Trapezius_SupermanHold_Home_General_Female_2.mp4',
  'TricepsLateralHead_BodyweightTricepExtension_Home_Build_Female_1.mp4',
  'TricepsLateralHead_BodyweightTricepExtension_Home_Build_Female_2.mp4',
  'TricepsLateralHead_CloseGripBenchPress_Gym_General_Female_1.mp4',
  'TricepsLateralHead_CloseGripBenchPress_Gym_General_Female_2.mp4',
  'TricepsLateralHead_DiamondPushUp_Home_General_Female_1.mp4',
  'TricepsLateralHead_DiamondPushUp_Home_General_Female_2.mp4',
  'TricepsLateralHead_TricepPushdown_Gym_Build_Female_1.mp4',
  'TricepsLateralHead_TricepPushdown_Gym_Build_Female_2.mp4',
  'TricepsLongHead_BodyweightTricepExtension_Home_Build_Female_1.mp4',
  'TricepsLongHead_BodyweightTricepExtension_Home_Build_Female_2.mp4',
  'TricepsLongHead_CableOverheadTricepExtension_Gym_Build_Female_1.mp4',
  'TricepsLongHead_CableOverheadTricepExtension_Gym_Build_Female_2.mp4',
  'TricepsLongHead_DiamondPushUp_Home_General_Female_1.mp4',
  'TricepsLongHead_DiamondPushUp_Home_General_Female_2.mp4',
  'TricepsLongHead_TricepPushdown_Gym_General_Female_1.mp4',
  'TricepsLongHead_TricepPushdown_Gym_General_Female_2.mp4',
  'TricepsMedialHead_BodyweightTricepExtension_Home_Build_Female_1.mp4',
  'TricepsMedialHead_BodyweightTricepExtension_Home_Build_Female_2.mp4',
  'TricepsMedialHead_CloseGripBenchPress_Gym_General_Female_1.mp4',
  'TricepsMedialHead_CloseGripBenchPress_Gym_General_Female_2.mp4',
  'TricepsMedialHead_DiamondPushUp_Home_General_Female_1.mp4',
  'TricepsMedialHead_DiamondPushUp_Home_General_Female_2.mp4',
  'TricepsMedialHead_ReverseGripTricepPushdown_Gym_Build_Female_1.mp4',
  'TricepsMedialHead_ReverseGripTricepPushdown_Gym_Build_Female_2.mp4',
  'anterior-deltoid_advanced_female(1).mp4',
  'anterior-deltoid_advanced_female(2).mp4',
  'anterior-deltoid_basic_female(1).mp4',
  'anterior-deltoid_basic_female(2).mp4',
  'biceps-advanced-female(1).mp4',
  'biceps-advanced-female(2).mp4',
  'biceps-basic-female(1).mp4',
  'biceps-basic-female(2).mp4',
  'calves-advanced-female(1).mp4',
  'calves-advanced-female(2).mp4',
  'calves-basic-female(1).mp4',
  'calves-basic-female(2).mp4',
  'chest-advanced-female(1).mp4',
  'chest-advanced-female(2).mp4',
  'chest-basic-female(1).mp4',
  'chest-basic-female(2).mp4',
  'feet_advanced_female(1).mp4',
  'feet_advanced_female(2).mp4',
  'feet_basic_female(1).mp4',
  'feet_basic_female(2).mp4',
  'forearms-advanced-female(1).mp4',
  'forearms-advanced-female(2).mp4',
  'forearms-basic-female(1).mp4',
  'forearms-basic-female(2).mp4',
  'front-shoulders-advanced-female(1).mp4',
  'front-shoulders-advanced-female(2).mp4',
  'front-shoulders-basic-female(1).mp4',
  'front-shoulders-basic-female(2).mp4',
  'gastrocnemius_advanced_female(1).mp4',
  'gastrocnemius_advanced_female(2).mp4',
  'gastrocnemius_basic_female(1).mp4',
  'gastrocnemius_basic_female(2).mp4',
  'groin-advanced-female(1).mp4',
  'groin-advanced-female(2).mp4',
  'groin-basic-female(1).mp4',
  'groin-basic-female(2).mp4',
  'hands-advanced-female(1).mp4',
  'hands-advanced-female(2).mp4',
  'hands-basic-female(1).mp4',
  'hands-basic-female(2).mp4',
  'inner-thigh_advanced_female(1).mp4',
  'inner-thigh_advanced_female(2).mp4',
  'inner-thigh_basic_female(1).mp4',
  'inner-thigh_basic_female(2).mp4',
  'lateral-deltoid_advanced_female(1).mp4',
  'lateral-deltoid_advanced_female(2).mp4',
  'lateral-deltoid_asvanced_female(1).mp4',
  'lateral-deltoid_asvanced_female(2).mp4',
  'lateral-deltoid_basic_female(1).mp4',
  'lateral-deltoid_basic_female(2).mp4',
  'long-head-bicep_advanced_female(1).mp4',
  'long-head-bicep_advanced_female(2).mp4',
  'long-head-bicep_basic_female(1).mp4',
  'long-head-bicep_basic_female(2).mp4',
  'lower-abdominals-advanced-female(1).mp4',
  'lower-abdominals-advanced-female(2).mp4',
  'lower-abdominals-basic-female(1).mp4',
  'lower-abdominals-basic-female(2).mp4',
  'mid-lower-pectoralis-advanced-female(1).mp4',
  'mid-lower-pectoralis-advanced-female(2).mp4',
  'mid-lower-pectoralis-basic-female(1).mp4',
  'mid-lower-pectoralis-basic-female(2).mp4',
  'neck_advanced_female(1).mp4',
  'neck_advanced_female(2).mp4',
  'neck_basic_female(1).mp4',
  'neck_basic_female(2).mp4',
  'obliques-advanced-female(1).mp4',
  'obliques-advanced-female(2).mp4',
  'obliques-basic-female(1).mp4',
  'obliques-basic-female(2).mp4',
  'outer-quadricep_advanced_female(1).mp4',
  'outer-quadricep_advanced_female(2).mp4',
  'outer-quadricep_basic_female(1).mp4',
  'outer-quadricep_basic_female(2).mp4',
  'quads-advanced-female(1).mp4',
  'quads-advanced-female(2).mp4',
  'quads-basic-female(1).mp4',
  'quads-basic-female(2).mp4',
  'rectus-femoris_advanced_female(1).mp4',
  'rectus-femoris_advanced_female(2).mp4',
  'rectus-femoris_basic_female(1).mp4',
  'rectus-femoris_basic_female(2).mp4',
  'soleus_advanced_female(1).mp4',
  'soleus_advanced_female(2).mp4',
  'soleus_basic_female(1).mp4',
  'soleus_basic_female(2).mp4',
  'tibialis_advanced_female(1).mp4',
  'tibialis_advanced_female(2).mp4',
  'tibialis_basic_female(1).mp4',
  'tibialis_basic_female(2).mp4',
  'traps-advanced-female(1).mp4',
  'traps-advanced-female(2).mp4',
  'traps-basic-female(1).mp4',
  'traps-basic-female(2).mp4',
  'upper-abdominals- basic-female(1).mp4',
  'upper-abdominals-advance-female(1).mp4',
  'upper-abdominals-advance-female(2).mp4',
  'upper-abdominals-advanced-female(1).mp4',
  'upper-abdominals-advanced-female(2).mp4',
  'upper-abdominals-basic-female(1).mp4',
  'upper-abdominals-basic-female(2)..mp4',
  'upper-abdominals-basic-female(2).mp4',
  'upper-abdominals_advance_female(1).mp4',
  'upper-abdominals_advance_female(2).mp4',
  'upper-abdominals_basic_female(1).mp4',
  'upper-abdominals_basic_female(2).mp4',
  'upper-pectoralis_advanced_female(1).mp4',
  'upper-pectoralis_advanced_female(2).mp4',
  'upper-pectoralis_basic_female(1).mp4',
  'upper-pectoralis_basic_female(2).mp4',
  'upper-trapzeius-advanced_female(1).mp4',
  'upper-trapzeius-advanced_female(2).mp4',
  'upper-trapzeius-basic_female(1).mp4',
  'upper-trapzeius-basic_female(2).mp4',
  'wrist-flexors-advanced-female(1).mp4',
  'wrist-flexors-advanced-female(2).mp4',
  'wrist-flexors-basic-female(1).mp4',
  'wrist-flexors-basic-female(2).mp4'
] as const;

const MALE_VIDEO_FILES = [
  'Abs-advanced-male(1).mp4',
  'Abs-advanced-male(2).mp4',
  'Abs-basic-male(1).mp4',
  'Abs-basic-male(2).mp4',
  'ErectorSpinae_BackExtension_Gym_Build_Male_1.mp4',
  'ErectorSpinae_BackExtension_Gym_Build_Male_2.mp4',
  'ErectorSpinae_BarbellDeadlift_Gym_General_Male_1.mp4',
  'ErectorSpinae_BarbellDeadlift_Gym_General_Male_2.mp4',
  'ErectorSpinae_BodyweightGoodMornings_Home_Build_Male_1.mp4',
  'ErectorSpinae_BodyweightGoodMornings_Home_Build_Male_2.mp4',
  'ErectorSpinae_SupermanHold_Home_General_Male_1.mp4',
  'ErectorSpinae_SupermanHold_Home_General_Male_2.mp4',
  'Gastrocnemius_BodyweightCalfRaise_Home_Build_Male_1.mp4',
  'Gastrocnemius_BodyweightCalfRaise_Home_Build_Male_2.mp4',
  'Gastrocnemius_SmithMachineCalfRaise_Gym_Build_Male_1.mp4',
  'Gastrocnemius_SmithMachineCalfRaise_Gym_Build_Male_2.mp4',
  'GluteusMaximus_BarbellHipThrust_Gym_Build_Male_1.mp4',
  'GluteusMaximus_BarbellHipThrust_Gym_Build_Male_2.mp4',
  'GluteusMaximus_BarbellSquat_Gym_General_Male_1.mp4',
  'GluteusMaximus_BarbellSquat_Gym_General_Male_2.mp4',
  'GluteusMaximus_BodyweightWaitersBow_Home_Build_Male_1.mp4',
  'GluteusMaximus_BodyweightWaitersBow_Home_Build_Male_2.mp4',
  'GluteusMaximus_BoxJump_Home_General_Male_1.mp4',
  'GluteusMaximus_BoxJump_Home_General_Male_2.mp4',
  'GluteusMedius_BarbellSquat_Gym_General_Male_1.mp4',
  'GluteusMedius_BarbellSquat_Gym_General_Male_2.mp4',
  'GluteusMedius_BodyweightStaggeredWaitersBow_Home_Build_Female_1.mp4',
  'GluteusMedius_BodyweightStaggeredWaitersBow_Home_Build_Female_2.mp4',
  'GluteusMedius_BodyweightStaggeredWaitersBow_Home_Build_Male_1.mp4',
  'GluteusMedius_BodyweightStaggeredWaitersBow_Home_Build_Male_2.mp4',
  'GluteusMedius_MachineGluteKickback_Gym_Build_Male_1.mp4',
  'GluteusMedius_MachineGluteKickback_Gym_Build_Male_2.mp4',
  'GluteusMedius_SingleLeggedRomanianDeadlifts_Home_General_Male_1.mp4',
  'GluteusMedius_SingleLeggedRomanianDeadlifts_Home_General_Male_2.mp4',
  'Hamstrings_BarbellStiffLegDeadlifts_Gym_Build_Male_1.mp4',
  'Hamstrings_BarbellStiffLegDeadlifts_Gym_Build_Male_2.mp4',
  'Hamstrings_BodyweightWaitersBow_Home_General_Male_1.mp4',
  'Hamstrings_BodyweightWaitersBow_Home_General_Male_2.mp4',
  'Hamstrings_LandmineRomanianDeadlift_Gym_General_Male_1.mp4',
  'Hamstrings_LandmineRomanianDeadlift_Gym_General_Male_2.mp4',
  'Hamstrings_SingleLeggedRomanianDeadlifts_Home_Build_Male_1.mp4',
  'Hamstrings_SingleLeggedRomanianDeadlifts_Home_Build_Male_2.mp4',
  'LatissimusDorsi_BodyweightSupermanRow_Home_Build_Male_1.mp4',
  'LatissimusDorsi_BodyweightSupermanRow_Home_Build_Male_2.mp4',
  'LatissimusDorsi_LatPulldown_Gym_Build_Male_1.mp4',
  'LatissimusDorsi_LatPulldown_Gym_Build_Male_2.mp4',
  'LatissimusDorsi_SeatedCableRow_Gym_General_Male_1.mp4',
  'LatissimusDorsi_SeatedCableRow_Gym_General_Male_2.mp4',
  'LatissimusDorsi_SupermanHold_Home_General_Male_1.mp4',
  'LatissimusDorsi_SupermanHold_Home_General_Male_2.mp4',
  'PosteriorDeltoid_BodyweightReverseFly_Home_Build_Male_1.mp4',
  'PosteriorDeltoid_BodyweightReverseFly_Home_Build_Male_2.mp4',
  'PosteriorDeltoid_FacePull_Gym_General_Male_1.mp4',
  'PosteriorDeltoid_FacePull_Gym_General_Male_2.mp4',
  'PosteriorDeltoid_ReversePecDeck_Gym_Build_Male_1.mp4',
  'PosteriorDeltoid_ReversePecDeck_Gym_Build_Male_2.mp4',
  'PosteriorDeltoid_SupermanHold_Home_General_Male_1.mp4',
  'PosteriorDeltoid_SupermanHold_Home_General_Male_2.mp4',
  'Soleus_BodyweightCalfRaise_Home_Build_Male_1.mp4',
  'Soleus_BodyweightCalfRaise_Home_Build_Male_2.mp4',
  'Soleus_SeatedCalfRaise_Gym_Build_Male_1.mp4',
  'Soleus_SeatedCalfRaise_Gym_Build_Male_2.mp4',
  'Soleus_SmithMachineCalfRaise_Gym_General_Male_1.mp4',
  'Soleus_SmithMachineCalfRaise_Gym_General_Male_2.mp4',
  'TeresMajor_BodyweightReverseFly_Home_Build_Male_1.mp4',
  'TeresMajor_BodyweightReverseFly_Home_Build_Male_2.mp4',
  'TeresMajor_LatPulldown_Gym_Build_Male_1.mp4',
  'TeresMajor_LatPulldown_Gym_Build_Male_2.mp4',
  'TeresMajor_SeatedCableRow_Gym_General_Male_1.mp4',
  'TeresMajor_SeatedCableRow_Gym_General_Male_2.mp4',
  'TeresMajor_SupermanHold_Home_General_Male_1.mp4',
  'TeresMajor_SupermanHold_Home_General_Male_2.mp4',
  'TeresMinor_BodyweightExternalRotation_Home_Build_Male_1.mp4',
  'TeresMinor_BodyweightExternalRotation_Home_Build_Male_2.mp4',
  'TeresMinor_CableExternalRotation_Gym_Build_Male_1.mp4',
  'TeresMinor_CableExternalRotation_Gym_Build_Male_2.mp4',
  'TeresMinor_FacePull_Gym_General_Male_1.mp4',
  'TeresMinor_FacePull_Gym_General_Male_2.mp4',
  'TeresMinor_SupermanHold_Home_General_Male_1.mp4',
  'TeresMinor_SupermanHold_Home_General_Male_2.mp4',
  'Trapezius_BarbellShrug_Gym_Build_Male_1.mp4',
  'Trapezius_BarbellShrug_Gym_Build_Male_2.mp4',
  'Trapezius_BodyweightShrug_Home_Build_Male_1.mp4',
  'Trapezius_BodyweightShrug_Home_Build_Male_2.mp4',
  'Trapezius_FacePull_Gym_General_Male_1.mp4',
  'Trapezius_FacePull_Gym_General_Male_2.mp4',
  'Trapezius_SupermanHold_Home_General_Male_1.mp4',
  'Trapezius_SupermanHold_Home_General_Male_2.mp4',
  'TricepsLateralHead_BodyweightTricepExtension_Home_Build_Male_1.mp4',
  'TricepsLateralHead_BodyweightTricepExtension_Home_Build_Male_2.mp4',
  'TricepsLateralHead_CloseGripBenchPress_Gym_General_Male_1.mp4',
  'TricepsLateralHead_CloseGripBenchPress_Gym_General_Male_2.mp4',
  'TricepsLateralHead_DiamondPushUp_Home_General_Male_1.mp4',
  'TricepsLateralHead_DiamondPushUp_Home_General_Male_2.mp4',
  'TricepsLateralHead_TricepPushdown_Gym_Build_Male_1.mp4',
  'TricepsLateralHead_TricepPushdown_Gym_Build_Male_2.mp4',
  'TricepsLongHead_BodyweightTricepExtension_Home_Build_Male_1.mp4',
  'TricepsLongHead_BodyweightTricepExtension_Home_Build_Male_2.mp4',
  'TricepsLongHead_CableOverheadTricepExtension_Gym_Build_Male_1.mp4',
  'TricepsLongHead_CableOverheadTricepExtension_Gym_Build_Male_2.mp4',
  'TricepsLongHead_DiamondPushUp_Home_General_Male_1.mp4',
  'TricepsLongHead_DiamondPushUp_Home_General_Male_2.mp4',
  'TricepsLongHead_TricepPushdown_Gym_General_Male_1.mp4',
  'TricepsLongHead_TricepPushdown_Gym_General_Male_2.mp4',
  'TricepsMedialHead_BodyweightTricepExtension_Home_Build_Male_1.mp4',
  'TricepsMedialHead_BodyweightTricepExtension_Home_Build_Male_2.mp4',
  'TricepsMedialHead_CloseGripBenchPress_Gym_General_Male_1.mp4',
  'TricepsMedialHead_CloseGripBenchPress_Gym_General_Male_2.mp4',
  'TricepsMedialHead_DiamondPushUp_Home_General_Male_1.mp4',
  'TricepsMedialHead_DiamondPushUp_Home_General_Male_2.mp4',
  'TricepsMedialHead_ReverseGripTricepPushdown_Gym_Build_Male_1.mp4',
  'TricepsMedialHead_ReverseGripTricepPushdown_Gym_Build_Male_2.mp4',
  'anterior-deltoid_advanced_male(1).mp4',
  'anterior-deltoid_advanced_male(2).mp4',
  'anterior-deltoid_basic_male(1).mp4',
  'anterior-deltoid_basic_male(2).mp4',
  'biceps-advanced-male(1).mp4',
  'biceps-advanced-male(2).mp4',
  'biceps-basic-male(1).mp4',
  'biceps-basic-male(2).mp4',
  'calves-advanced-male(1).mp4',
  'calves-advanced-male(2).mp4',
  'calves-basic-male(1).mp4',
  'calves-basic-male(2).mp4',
  'chest-advanced-male(1).mp4',
  'chest-advanced-male(2).mp4',
  'chest-basic-male(1).mp4',
  'chest-basic-male(2).mp4',
  'feet_advanced_male(1).mp4',
  'feet_advanced_male(2).mp4',
  'feet_basic_male(1).mp4',
  'feet_basic_male(2).mp4',
  'forearms-advanced-male(1).mp4',
  'forearms-advanced-male(2).mp4',
  'forearms-basic-male(1).mp4',
  'forearms-basic-male(2).mp4',
  'front-shoulders-advanced-male(1).mp4',
  'front-shoulders-advanced-male(2).mp4',
  'front-shoulders-basic-male(1).mp4',
  'front-shoulders-basic-male(2).mp4',
  'gastrocnemius_advanced_male(1).mp4',
  'gastrocnemius_advanced_male(2).mp4',
  'gastrocnemius_basic_male(1).mp4',
  'gastrocnemius_basic_male(2).mp4',
  'groin-advanced-male(1).mp4',
  'groin-advanced-male(2).mp4',
  'groin-basic-male(1).mp4',
  'groin-basic-male(2).mp4',
  'hands-advanced-male(1).mp4',
  'hands-advanced-male(2).mp4',
  'hands-basic-male(1).mp4',
  'hands-basic-male(2).mp4',
  'inner-thigh_advanced_male(1).mp4',
  'inner-thigh_advanced_male(2).mp4',
  'inner-thigh_basic_male(1).mp4',
  'inner-thigh_basic_male(2).mp4',
  'lateral-deltoid_advanced_male(1).mp4',
  'lateral-deltoid_advanced_male(2).mp4',
  'lateral-deltoid_asvanced_male(1).mp4',
  'lateral-deltoid_asvanced_male(2).mp4',
  'lateral-deltoid_basic_male(1).mp4',
  'lateral-deltoid_basic_male(2).mp4',
  'long-head-bicep_advanced_male(1).mp4',
  'long-head-bicep_advanced_male(2).mp4',
  'long-head-bicep_basic_male(1).mp4',
  'long-head-bicep_basic_male(2).mp4',
  'lower-abdominals-advanced-male(1).mp4',
  'lower-abdominals-advanced-male(2).mp4',
  'lower-abdominals-basic-male(1).mp4',
  'lower-abdominals-basic-male(2).mp4',
  'mid-lower-pectoralis-advanced-male(1).mp4',
  'mid-lower-pectoralis-advanced-male(2).mp4',
  'mid-lower-pectoralis-basic-male(1).mp4',
  'mid-lower-pectoralis-basic-male(2).mp4',
  'neck_advanced_male(1).mp4',
  'neck_advanced_male(2).mp4',
  'neck_basic_male(1).mp4',
  'neck_basic_male(2).mp4',
  'obliques-advanced-male(1).mp4',
  'obliques-advanced-male(2).mp4',
  'obliques-basic-male(1).mp4',
  'obliques-basic-male(2).mp4',
  'outer-quadricep_advanced_male(1).mp4',
  'outer-quadricep_advanced_male(2).mp4',
  'outer-quadricep_basic_male(1).mp4',
  'outer-quadricep_basic_male(2).mp4',
  'quads-advanced-male(1).mp4',
  'quads-advanced-male(2).mp4',
  'quads-basic-male(1).mp4',
  'quads-basic-male(2).mp4',
  'rectus-femoris_advanced_male(1).mp4',
  'rectus-femoris_advanced_male(2).mp4',
  'rectus-femoris_basic_male(1).mp4',
  'rectus-femoris_basic_male(2).mp4',
  'soleus_advanced_male(1).mp4',
  'soleus_advanced_male(2).mp4',
  'soleus_basic_male(1).mp4',
  'soleus_basic_male(2).mp4',
  'tibialis_advanced_male(1).mp4',
  'tibialis_advanced_male(2).mp4',
  'tibialis_basic_male(1).mp4',
  'tibialis_basic_male(2).mp4',
  'traps-advanced-male(1).mp4',
  'traps-advanced-male(2).mp4',
  'traps-basic-male(1).mp4',
  'traps-basic-male(2).mp4',
  'upper-abdominals- basic-male(1).mp4',
  'upper-abdominals- basic-male(2).mp4',
  'upper-abdominals-advance-male(1).mp4',
  'upper-abdominals-advance-male(2).mp4',
  'upper-abdominals-advanced-male(1).mp4',
  'upper-abdominals-advanced-male(2).mp4',
  'upper-abdominals-basic-male(1).mp4',
  'upper-abdominals-basic-male(2).mp4',
  'upper-abdominals_advance_male(1).mp4',
  'upper-abdominals_advance_male(2).mp4',
  'upper-abdominals_basic_male(1).mp4',
  'upper-abdominals_basic_male(2).mp4',
  'upper-pectoralis_advanced_male(1).mp4',
  'upper-pectoralis_advanced_male(2).mp4',
  'upper-pectoralis_basic_male(1).mp4',
  'upper-pectoralis_basic_male(2).mp4',
  'upper-trapzeius-advanced_male(1).mp4',
  'upper-trapzeius-advanced_male(2).mp4',
  'upper-trapzeius-basic_male(1).mp4',
  'upper-trapzeius-basic_male(2).mp4',
  'wrist-flexors-advanced-male(1).mp4',
  'wrist-flexors-advanced-male(2).mp4',
  'wrist-flexors-basic-male(1).mp4',
  'wrist-flexors-basic-male(2).mp4'
] as const;

const normalizeName = (s: string): string => s.toLowerCase().replace(/[^a-z0-9]/g, '');

const parseClip = (file: string, gender: SourceGender): LocalClip => {
  const baseName = file.replace(/\.mp4$/i, '');

  // Prefer underscore-style tokens (CamelCase muscle names are first token)
  if (baseName.includes('_')) {
    const parts = baseName.split('_');
    const muscle = parts[0] ?? 'General';
    const location: SourceLocation = parts.includes('Home') ? 'home' : 'gym';
    const goal: SourceGoal = parts.includes('General') ? 'general' : 'build';

    return {
      file,
      path: `/videos/back-muscles/${gender}/${file}`,
      gender,
      muscle,
      location,
      goal,
    };
  }

  // Hyphenated files (e.g. "chest-advanced-female(1).mp4"
  let musclePart = baseName.replace(/\(\d+\)$/i, ''); // strip trailing (1) etc
  // remove gender suffix if present
  musclePart = musclePart.replace(/-(female|male)$/i, '');

  // strip common suffixes like -advanced, -advance, -basic
  const suffixes = ['-advanced', '-advance', '-basic', '-advanced'];
  for (const s of suffixes) {
    const i = musclePart.toLowerCase().indexOf(s);
    if (i !== -1) {
      musclePart = musclePart.substring(0, i);
      break;
    }
  }

  // cleanup trailing hyphens
  musclePart = musclePart.replace(/-+$/g, '');

  const muscle = musclePart || 'General';
  const location: SourceLocation = /home/i.test(baseName) ? 'home' : 'gym';
  const goal: SourceGoal = /general/i.test(baseName) ? 'general' : 'build';

  return {
    file,
    path: `/videos/back-muscles/${gender}/${file}`,
    gender,
    muscle,
    location,
    goal,
  };
};

const ALL_CLIPS: LocalClip[] = [
  ...FEMALE_VIDEO_FILES.map((file) => parseClip(file, 'female')),
  ...MALE_VIDEO_FILES.map((file) => parseClip(file, 'male')),
];

const MUSCLE_TO_SOURCE_MUSCLES: Record<Exercise['muscle'], string[]> = {
  chest: [],
  back: ['LatissimusDorsi', 'ErectorSpinae', 'TeresMajor', 'TeresMinor', 'Trapezius', 'PosteriorDeltoid'],
  shoulders: ['PosteriorDeltoid', 'Trapezius'],
  biceps: [],
  triceps: ['TricepsLongHead', 'TricepsLateralHead', 'TricepsMedialHead'],
  abs: [],
  quads: [],
  hamstrings: ['Hamstrings'],
  glutes: ['GluteusMaximus', 'GluteusMedius'],
  calves: ['Gastrocnemius', 'Soleus'],
};

const MUSCLE_SYNONYMS: Record<Exercise['muscle'], string[]> = {
  chest: ['chest', 'pectoralis', 'mid-lower-pectoralis', 'upper-pectoralis'],
  back: ['latissimus', 'latissimusdorsi', 'erectorspinae', 'teresmajor', 'teresminor', 'trapezius'],
  shoulders: ['shoulder', 'deltoid', 'anterior-deltoid', 'lateral-deltoid', 'posterior-deltoid', 'front-shoulders'],
  biceps: ['biceps', 'long-head-bicep', 'longheadbicep'],
  triceps: ['triceps', 'tricepslonghead', 'tricepslateralhead', 'tricepsmedialhead'],
  abs: ['abdominals', 'abdominal', 'upper-abdominals', 'lower-abdominals', 'rectusfemoris'],
  quads: ['quads', 'quadricep', 'outer-quadricep', 'rectusfemoris'],
  hamstrings: ['hamstrings', 'hamstring'],
  glutes: ['gluteus', 'glutes', 'gluteusmaximus', 'gluteusmedius'],
  calves: ['gastrocnemius', 'soleus', 'calves'],
};

const goalToSourceGoal = (goal: Exercise['goal']): SourceGoal | null => {
  if (goal === 'bulking') {
    return 'build';
  }

  if (goal === 'cutting' || goal === 'fitness') {
    return 'general';
  }

  return null;
};

const hashString = (value: string): number => {
  let hash = 0;

  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }

  return Math.abs(hash);
};

const pickDeterministicClip = (clips: LocalClip[], seed: string): LocalClip | null => {
  if (clips.length === 0) {
    return null;
  }

  const index = hashString(seed) % clips.length;
  return clips[index];
};

export function getExerciseVideoUrl(exercise: Exercise, preferredGender: PreferredGender = null): string {
  const preferredMuscles = MUSCLE_TO_SOURCE_MUSCLES[exercise.muscle] ?? [];
  const preferredNorm = preferredMuscles.map(normalizeName);
  const exerciseNorm = normalizeName(exercise.muscle);

  const preferredGoal = goalToSourceGoal(exercise.goal);
  const requestedGender: PreferredGender =
    preferredGender ?? (exercise.gender === 'all' ? null : exercise.gender);

  const clipsByGender =
    requestedGender === null
      ? ALL_CLIPS
      : ALL_CLIPS.filter((clip) => clip.gender === requestedGender);

  const matchesMuscle = (clip: LocalClip): boolean => {
    const clipNorm = normalizeName(clip.muscle);
    if (preferredNorm.length > 0) {
      return preferredNorm.includes(clipNorm);
    }

    // fallback: direct substring match or synonyms
    if (clipNorm.includes(exerciseNorm) || exerciseNorm.includes(clipNorm)) {
      return true;
    }

    const synonyms = MUSCLE_SYNONYMS[exercise.muscle] ?? [];
    return synonyms.some((k) => clipNorm.includes(normalizeName(k)));
  };

  const byMuscle = clipsByGender.filter((clip) => matchesMuscle(clip));

  const byLocation =
    exercise.location === 'both' ? byMuscle : byMuscle.filter((clip) => clip.location === exercise.location);
  const byGoal = preferredGoal ? byLocation.filter((clip) => clip.goal === preferredGoal) : byLocation;

  const anyGenderByMuscle = ALL_CLIPS.filter((clip) => matchesMuscle(clip));
  const anyGenderByLocation =
    exercise.location === 'both' ? anyGenderByMuscle : anyGenderByMuscle.filter((clip) => clip.location === exercise.location);
  const anyGenderByGoal = preferredGoal ? anyGenderByLocation.filter((clip) => clip.goal === preferredGoal) : anyGenderByLocation;

  const candidatePools: LocalClip[][] = [byGoal, byLocation, byMuscle, anyGenderByGoal, anyGenderByLocation, anyGenderByMuscle];

  for (const pool of candidatePools) {
    const clip = pickDeterministicClip(pool, exercise.id);
    if (clip) {
      return clip.path;
    }
  }

  return '';
}

export function isLocalExerciseVideo(videoUrl: string): boolean {
  return videoUrl.startsWith('/videos/back-muscles/');
}
