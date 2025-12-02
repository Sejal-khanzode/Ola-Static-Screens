// generated with @7nohe/openapi-react-query-codegen@1.6.2 

import { type QueryClient } from "@tanstack/react-query";
import { AllergyControllerService, AppointmentManagementService, AppointmentTypeManagementService, AvailabilityManagementService, ClinicControllerService, ClinicalTemplateService, DocumentTypeControllerService, FeeScheduleControllerService, InsurancePayerControllerService, IntakeFormConsentTemplateService, LicenseStateControllerService, LocationControllerService, MedicalCodeControllerService, MigrationControllerService, PatientAllergyControllerService, PatientClinicControllerService, PatientControllerService, PatientDiagnosisControllerService, PatientDocumentControllerService, PatientFamilyHistoryControllerService, PatientFlagControllerService, PatientInsuranceControllerService, PatientMedicalHistoryControllerService, PatientSurgicalHistoryControllerService, PatientVaccineControllerService, PharmacyLabRadiologyControllerService, PrintConfigurationControllerService, ProviderControllerService, RequestAppointmentManagementService, SpecialityControllerService, StickyNoteControllerService, StripeControllerService, TextMacroControllerService, UserControllerService, VaccinesControllerService, VideoControllerService, VisitNoteTemplateService } from "../requests/services.gen";
import * as Common from "./common";
export const ensureUseUserControllerServiceGetApiMasterUsersData = (queryClient: QueryClient, { archive, clinicId, page, searchString, size, sortBy, sortDirection, status }: {
  archive?: boolean;
  clinicId?: string;
  page?: number;
  searchString?: string;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
  status?: boolean;
} = {}) => queryClient.ensureQueryData({ queryKey: Common.UseUserControllerServiceGetApiMasterUsersKeyFn({ archive, clinicId, page, searchString, size, sortBy, sortDirection, status }), queryFn: () => UserControllerService.getApiMasterUsers({ archive, clinicId, page, searchString, size, sortBy, sortDirection, status }) });
export const ensureUseUserControllerServiceGetApiMasterUserByUserIdData = (queryClient: QueryClient, { userId }: {
  userId: string;
}) => queryClient.ensureQueryData({ queryKey: Common.UseUserControllerServiceGetApiMasterUserByUserIdKeyFn({ userId }), queryFn: () => UserControllerService.getApiMasterUserByUserId({ userId }) });
export const ensureUseUserControllerServiceGetApiMasterProfileData = (queryClient: QueryClient) => queryClient.ensureQueryData({ queryKey: Common.UseUserControllerServiceGetApiMasterProfileKeyFn(), queryFn: () => UserControllerService.getApiMasterProfile() });
export const ensureUseVisitNoteTemplateServiceGetApiMasterVisitNoteTemplateData = (queryClient: QueryClient, { active, clinicUuid, page, size, sortBy, sortDirection, templateName, templateType }: {
  active?: boolean;
  clinicUuid?: string;
  page?: number;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
  templateName?: string;
  templateType?: "ROS" | "PE" | "SOAP_NOTE" | "SIMPLE_NOTE" | "CONSULTATION_NOTE";
} = {}) => queryClient.ensureQueryData({ queryKey: Common.UseVisitNoteTemplateServiceGetApiMasterVisitNoteTemplateKeyFn({ active, clinicUuid, page, size, sortBy, sortDirection, templateName, templateType }), queryFn: () => VisitNoteTemplateService.getApiMasterVisitNoteTemplate({ active, clinicUuid, page, size, sortBy, sortDirection, templateName, templateType }) });
export const ensureUseVisitNoteTemplateServiceGetApiMasterVisitNoteTemplateByTemplateIdData = (queryClient: QueryClient, { templateId }: {
  templateId: string;
}) => queryClient.ensureQueryData({ queryKey: Common.UseVisitNoteTemplateServiceGetApiMasterVisitNoteTemplateByTemplateIdKeyFn({ templateId }), queryFn: () => VisitNoteTemplateService.getApiMasterVisitNoteTemplateByTemplateId({ templateId }) });
export const ensureUseVisitNoteTemplateServiceGetApiMasterVisitNoteTemplateClinicByClinicUuidData = (queryClient: QueryClient, { clinicUuid }: {
  clinicUuid: string;
}) => queryClient.ensureQueryData({ queryKey: Common.UseVisitNoteTemplateServiceGetApiMasterVisitNoteTemplateClinicByClinicUuidKeyFn({ clinicUuid }), queryFn: () => VisitNoteTemplateService.getApiMasterVisitNoteTemplateClinicByClinicUuid({ clinicUuid }) });
export const ensureUseVisitNoteTemplateServiceGetApiMasterVisitNoteTemplateClinicByClinicUuidTypeByTemplateTypeData = (queryClient: QueryClient, { clinicUuid, templateType }: {
  clinicUuid: string;
  templateType: "ROS" | "PE" | "SOAP_NOTE" | "SIMPLE_NOTE" | "CONSULTATION_NOTE";
}) => queryClient.ensureQueryData({ queryKey: Common.UseVisitNoteTemplateServiceGetApiMasterVisitNoteTemplateClinicByClinicUuidTypeByTemplateTypeKeyFn({ clinicUuid, templateType }), queryFn: () => VisitNoteTemplateService.getApiMasterVisitNoteTemplateClinicByClinicUuidTypeByTemplateType({ clinicUuid, templateType }) });
export const ensureUseTextMacroControllerServiceGetApiMasterTextMacroData = (queryClient: QueryClient, { clinicUuid, page, size, sortBy, sortDirection, title }: {
  clinicUuid?: string;
  page?: number;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
  title?: string;
} = {}) => queryClient.ensureQueryData({ queryKey: Common.UseTextMacroControllerServiceGetApiMasterTextMacroKeyFn({ clinicUuid, page, size, sortBy, sortDirection, title }), queryFn: () => TextMacroControllerService.getApiMasterTextMacro({ clinicUuid, page, size, sortBy, sortDirection, title }) });
export const ensureUseTextMacroControllerServiceGetApiMasterTextMacroByTextMacroIdData = (queryClient: QueryClient, { textMacroId }: {
  textMacroId: string;
}) => queryClient.ensureQueryData({ queryKey: Common.UseTextMacroControllerServiceGetApiMasterTextMacroByTextMacroIdKeyFn({ textMacroId }), queryFn: () => TextMacroControllerService.getApiMasterTextMacroByTextMacroId({ textMacroId }) });
export const ensureUseStickyNoteControllerServiceGetApiMasterStickyNotesData = (queryClient: QueryClient, { archive, page, patientClinicUuid, size, sort, sortBy, status }: {
  archive?: boolean;
  page?: number;
  patientClinicUuid: string;
  size?: number;
  sort?: string;
  sortBy?: string;
  status?: boolean;
}) => queryClient.ensureQueryData({ queryKey: Common.UseStickyNoteControllerServiceGetApiMasterStickyNotesKeyFn({ archive, page, patientClinicUuid, size, sort, sortBy, status }), queryFn: () => StickyNoteControllerService.getApiMasterStickyNotes({ archive, page, patientClinicUuid, size, sort, sortBy, status }) });
export const ensureUseStickyNoteControllerServiceGetApiMasterStickyNotesByStickyNoteIdData = (queryClient: QueryClient, { stickyNoteId }: {
  stickyNoteId: string;
}) => queryClient.ensureQueryData({ queryKey: Common.UseStickyNoteControllerServiceGetApiMasterStickyNotesByStickyNoteIdKeyFn({ stickyNoteId }), queryFn: () => StickyNoteControllerService.getApiMasterStickyNotesByStickyNoteId({ stickyNoteId }) });
export const ensureUseProviderControllerServiceGetApiMasterProviderData = (queryClient: QueryClient, { archive, clinicId, page, searchString, size, sortBy, sortDirection, status }: {
  archive?: boolean;
  clinicId?: string;
  page?: number;
  searchString?: string;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
  status?: boolean;
} = {}) => queryClient.ensureQueryData({ queryKey: Common.UseProviderControllerServiceGetApiMasterProviderKeyFn({ archive, clinicId, page, searchString, size, sortBy, sortDirection, status }), queryFn: () => ProviderControllerService.getApiMasterProvider({ archive, clinicId, page, searchString, size, sortBy, sortDirection, status }) });
export const ensureUseProviderControllerServiceGetApiMasterProviderByProviderIdData = (queryClient: QueryClient, { providerId }: {
  providerId: string;
}) => queryClient.ensureQueryData({ queryKey: Common.UseProviderControllerServiceGetApiMasterProviderByProviderIdKeyFn({ providerId }), queryFn: () => ProviderControllerService.getApiMasterProviderByProviderId({ providerId }) });
export const ensureUseProviderControllerServiceGetApiMasterProviderByProviderIdClinicsData = (queryClient: QueryClient, { active, archive, isProvider, providerId }: {
  active?: boolean;
  archive?: boolean;
  isProvider?: boolean;
  providerId: string;
}) => queryClient.ensureQueryData({ queryKey: Common.UseProviderControllerServiceGetApiMasterProviderByProviderIdClinicsKeyFn({ active, archive, isProvider, providerId }), queryFn: () => ProviderControllerService.getApiMasterProviderByProviderIdClinics({ active, archive, isProvider, providerId }) });
export const ensureUseProviderControllerServiceGetApiMasterProviderUserByUserUuidData = (queryClient: QueryClient, { userUuid }: {
  userUuid: string;
}) => queryClient.ensureQueryData({ queryKey: Common.UseProviderControllerServiceGetApiMasterProviderUserByUserUuidKeyFn({ userUuid }), queryFn: () => ProviderControllerService.getApiMasterProviderUserByUserUuid({ userUuid }) });
export const ensureUseProviderControllerServiceGetApiMasterProviderProfileData = (queryClient: QueryClient) => queryClient.ensureQueryData({ queryKey: Common.UseProviderControllerServiceGetApiMasterProviderProfileKeyFn(), queryFn: () => ProviderControllerService.getApiMasterProviderProfile() });
export const ensureUseProviderControllerServiceGetApiMasterProviderCountsData = (queryClient: QueryClient) => queryClient.ensureQueryData({ queryKey: Common.UseProviderControllerServiceGetApiMasterProviderCountsKeyFn(), queryFn: () => ProviderControllerService.getApiMasterProviderCounts() });
export const ensureUsePrintConfigurationControllerServiceGetApiMasterPrintConfigurationClinicByClinicUuidData = (queryClient: QueryClient, { clinicUuid }: {
  clinicUuid: string;
}) => queryClient.ensureQueryData({ queryKey: Common.UsePrintConfigurationControllerServiceGetApiMasterPrintConfigurationClinicByClinicUuidKeyFn({ clinicUuid }), queryFn: () => PrintConfigurationControllerService.getApiMasterPrintConfigurationClinicByClinicUuid({ clinicUuid }) });
export const ensureUsePatientControllerServiceGetApiMasterPatientData = (queryClient: QueryClient, { archive, page, searchString, size, sortBy, sortDirection, status }: {
  archive?: boolean;
  page?: number;
  searchString?: string;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
  status?: boolean;
} = {}) => queryClient.ensureQueryData({ queryKey: Common.UsePatientControllerServiceGetApiMasterPatientKeyFn({ archive, page, searchString, size, sortBy, sortDirection, status }), queryFn: () => PatientControllerService.getApiMasterPatient({ archive, page, searchString, size, sortBy, sortDirection, status }) });
export const ensureUsePatientControllerServiceGetApiMasterPatientByPatientIdData = (queryClient: QueryClient, { patientId }: {
  patientId: string;
}) => queryClient.ensureQueryData({ queryKey: Common.UsePatientControllerServiceGetApiMasterPatientByPatientIdKeyFn({ patientId }), queryFn: () => PatientControllerService.getApiMasterPatientByPatientId({ patientId }) });
export const ensureUsePatientControllerServiceGetApiMasterPatientByPatientIdSignatureData = (queryClient: QueryClient, { patientId }: {
  patientId: string;
}) => queryClient.ensureQueryData({ queryKey: Common.UsePatientControllerServiceGetApiMasterPatientByPatientIdSignatureKeyFn({ patientId }), queryFn: () => PatientControllerService.getApiMasterPatientByPatientIdSignature({ patientId }) });
export const ensureUsePatientControllerServiceGetApiMasterPatientProfileData = (queryClient: QueryClient) => queryClient.ensureQueryData({ queryKey: Common.UsePatientControllerServiceGetApiMasterPatientProfileKeyFn(), queryFn: () => PatientControllerService.getApiMasterPatientProfile() });
export const ensureUsePatientVaccineControllerServiceGetApiMasterPatientVaccineData = (queryClient: QueryClient, { archive, page, patientClinicUuid, searchString, size, sort, sortBy, status }: {
  archive?: boolean;
  page?: number;
  patientClinicUuid: string;
  searchString?: string;
  size?: number;
  sort?: string;
  sortBy?: string;
  status?: boolean;
}) => queryClient.ensureQueryData({ queryKey: Common.UsePatientVaccineControllerServiceGetApiMasterPatientVaccineKeyFn({ archive, page, patientClinicUuid, searchString, size, sort, sortBy, status }), queryFn: () => PatientVaccineControllerService.getApiMasterPatientVaccine({ archive, page, patientClinicUuid, searchString, size, sort, sortBy, status }) });
export const ensureUsePatientVaccineControllerServiceGetApiMasterPatientVaccineByPatientVaccineIdData = (queryClient: QueryClient, { patientVaccineId }: {
  patientVaccineId: string;
}) => queryClient.ensureQueryData({ queryKey: Common.UsePatientVaccineControllerServiceGetApiMasterPatientVaccineByPatientVaccineIdKeyFn({ patientVaccineId }), queryFn: () => PatientVaccineControllerService.getApiMasterPatientVaccineByPatientVaccineId({ patientVaccineId }) });
export const ensureUsePatientSurgicalHistoryControllerServiceGetApiMasterPatientSurgicalHistoryData = (queryClient: QueryClient, { archive, page, patientClinicUuid, searchString, size, sort, sortBy, status }: {
  archive?: boolean;
  page?: number;
  patientClinicUuid: string;
  searchString?: string;
  size?: number;
  sort?: string;
  sortBy?: string;
  status?: boolean;
}) => queryClient.ensureQueryData({ queryKey: Common.UsePatientSurgicalHistoryControllerServiceGetApiMasterPatientSurgicalHistoryKeyFn({ archive, page, patientClinicUuid, searchString, size, sort, sortBy, status }), queryFn: () => PatientSurgicalHistoryControllerService.getApiMasterPatientSurgicalHistory({ archive, page, patientClinicUuid, searchString, size, sort, sortBy, status }) });
export const ensureUsePatientSurgicalHistoryControllerServiceGetApiMasterPatientSurgicalHistoryByPatientSurgicalHistoryIdData = (queryClient: QueryClient, { patientSurgicalHistoryId }: {
  patientSurgicalHistoryId: string;
}) => queryClient.ensureQueryData({ queryKey: Common.UsePatientSurgicalHistoryControllerServiceGetApiMasterPatientSurgicalHistoryByPatientSurgicalHistoryIdKeyFn({ patientSurgicalHistoryId }), queryFn: () => PatientSurgicalHistoryControllerService.getApiMasterPatientSurgicalHistoryByPatientSurgicalHistoryId({ patientSurgicalHistoryId }) });
export const ensureUsePatientMedicalHistoryControllerServiceGetApiMasterPatientMedicalHistoryData = (queryClient: QueryClient, { archive, page, patientClinicUuid, searchString, size, sort, sortBy, status }: {
  archive?: boolean;
  page?: number;
  patientClinicUuid: string;
  searchString?: string;
  size?: number;
  sort?: string;
  sortBy?: string;
  status?: boolean;
}) => queryClient.ensureQueryData({ queryKey: Common.UsePatientMedicalHistoryControllerServiceGetApiMasterPatientMedicalHistoryKeyFn({ archive, page, patientClinicUuid, searchString, size, sort, sortBy, status }), queryFn: () => PatientMedicalHistoryControllerService.getApiMasterPatientMedicalHistory({ archive, page, patientClinicUuid, searchString, size, sort, sortBy, status }) });
export const ensureUsePatientMedicalHistoryControllerServiceGetApiMasterPatientMedicalHistoryByPatientMedicalHistoryIdData = (queryClient: QueryClient, { patientMedicalHistoryId }: {
  patientMedicalHistoryId: string;
}) => queryClient.ensureQueryData({ queryKey: Common.UsePatientMedicalHistoryControllerServiceGetApiMasterPatientMedicalHistoryByPatientMedicalHistoryIdKeyFn({ patientMedicalHistoryId }), queryFn: () => PatientMedicalHistoryControllerService.getApiMasterPatientMedicalHistoryByPatientMedicalHistoryId({ patientMedicalHistoryId }) });
export const ensureUsePatientInsuranceControllerServiceGetApiMasterPatientInsuranceData = (queryClient: QueryClient, { active, archive, clinicUuid, insuranceType, page, patientClinicUuid, searchString, size, sortBy, sortDirection }: {
  active?: boolean;
  archive?: boolean;
  clinicUuid?: string;
  insuranceType?: "PRIMARY" | "SECONDARY" | "TERTIARY" | "OTHER";
  page?: number;
  patientClinicUuid?: string;
  searchString?: string;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
} = {}) => queryClient.ensureQueryData({ queryKey: Common.UsePatientInsuranceControllerServiceGetApiMasterPatientInsuranceKeyFn({ active, archive, clinicUuid, insuranceType, page, patientClinicUuid, searchString, size, sortBy, sortDirection }), queryFn: () => PatientInsuranceControllerService.getApiMasterPatientInsurance({ active, archive, clinicUuid, insuranceType, page, patientClinicUuid, searchString, size, sortBy, sortDirection }) });
export const ensureUsePatientInsuranceControllerServiceGetApiMasterPatientInsuranceByPatientInsuranceIdData = (queryClient: QueryClient, { patientInsuranceId }: {
  patientInsuranceId: string;
}) => queryClient.ensureQueryData({ queryKey: Common.UsePatientInsuranceControllerServiceGetApiMasterPatientInsuranceByPatientInsuranceIdKeyFn({ patientInsuranceId }), queryFn: () => PatientInsuranceControllerService.getApiMasterPatientInsuranceByPatientInsuranceId({ patientInsuranceId }) });
export const ensureUsePatientInsuranceControllerServiceGetApiMasterPatientInsurancePatientClinicByPatientClinicUuidData = (queryClient: QueryClient, { active, archive, patientClinicUuid }: {
  active?: boolean;
  archive?: boolean;
  patientClinicUuid: string;
}) => queryClient.ensureQueryData({ queryKey: Common.UsePatientInsuranceControllerServiceGetApiMasterPatientInsurancePatientClinicByPatientClinicUuidKeyFn({ active, archive, patientClinicUuid }), queryFn: () => PatientInsuranceControllerService.getApiMasterPatientInsurancePatientClinicByPatientClinicUuid({ active, archive, patientClinicUuid }) });
export const ensureUsePatientFlagControllerServiceGetApiMasterPatientFlagData = (queryClient: QueryClient, { archive, clinicUuid, page, searchString, size, sortBy, sortDirection, status }: {
  archive?: boolean;
  clinicUuid?: string;
  page?: number;
  searchString?: string;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
  status?: boolean;
} = {}) => queryClient.ensureQueryData({ queryKey: Common.UsePatientFlagControllerServiceGetApiMasterPatientFlagKeyFn({ archive, clinicUuid, page, searchString, size, sortBy, sortDirection, status }), queryFn: () => PatientFlagControllerService.getApiMasterPatientFlag({ archive, clinicUuid, page, searchString, size, sortBy, sortDirection, status }) });
export const ensureUsePatientFlagControllerServiceGetApiMasterPatientFlagByPatientFlagIdData = (queryClient: QueryClient, { patientFlagId }: {
  patientFlagId: string;
}) => queryClient.ensureQueryData({ queryKey: Common.UsePatientFlagControllerServiceGetApiMasterPatientFlagByPatientFlagIdKeyFn({ patientFlagId }), queryFn: () => PatientFlagControllerService.getApiMasterPatientFlagByPatientFlagId({ patientFlagId }) });
export const ensureUsePatientFlagControllerServiceGetApiMasterPatientFlagPatientClinicByPatientClinicUuidData = (queryClient: QueryClient, { patientClinicUuid }: {
  patientClinicUuid: string;
}) => queryClient.ensureQueryData({ queryKey: Common.UsePatientFlagControllerServiceGetApiMasterPatientFlagPatientClinicByPatientClinicUuidKeyFn({ patientClinicUuid }), queryFn: () => PatientFlagControllerService.getApiMasterPatientFlagPatientClinicByPatientClinicUuid({ patientClinicUuid }) });
export const ensureUsePatientFlagControllerServiceGetApiMasterPatientFlagClinicByClinicIdData = (queryClient: QueryClient) => queryClient.ensureQueryData({ queryKey: Common.UsePatientFlagControllerServiceGetApiMasterPatientFlagClinicByClinicIdKeyFn(), queryFn: () => PatientFlagControllerService.getApiMasterPatientFlagClinicByClinicId() });
export const ensureUsePatientFlagControllerServiceGetApiMasterPatientFlagActiveData = (queryClient: QueryClient) => queryClient.ensureQueryData({ queryKey: Common.UsePatientFlagControllerServiceGetApiMasterPatientFlagActiveKeyFn(), queryFn: () => PatientFlagControllerService.getApiMasterPatientFlagActive() });
export const ensureUsePatientFamilyHistoryControllerServiceGetApiMasterPatientFamilyHistoryData = (queryClient: QueryClient, { archive, page, patientClinicUuid, searchString, size, sort, sortBy, status }: {
  archive?: boolean;
  page?: number;
  patientClinicUuid: string;
  searchString?: string;
  size?: number;
  sort?: string;
  sortBy?: string;
  status?: boolean;
}) => queryClient.ensureQueryData({ queryKey: Common.UsePatientFamilyHistoryControllerServiceGetApiMasterPatientFamilyHistoryKeyFn({ archive, page, patientClinicUuid, searchString, size, sort, sortBy, status }), queryFn: () => PatientFamilyHistoryControllerService.getApiMasterPatientFamilyHistory({ archive, page, patientClinicUuid, searchString, size, sort, sortBy, status }) });
export const ensureUsePatientFamilyHistoryControllerServiceGetApiMasterPatientFamilyHistoryByPatientFamilyHistoryIdData = (queryClient: QueryClient, { patientFamilyHistoryId }: {
  patientFamilyHistoryId: string;
}) => queryClient.ensureQueryData({ queryKey: Common.UsePatientFamilyHistoryControllerServiceGetApiMasterPatientFamilyHistoryByPatientFamilyHistoryIdKeyFn({ patientFamilyHistoryId }), queryFn: () => PatientFamilyHistoryControllerService.getApiMasterPatientFamilyHistoryByPatientFamilyHistoryId({ patientFamilyHistoryId }) });
export const ensureUsePatientDocumentControllerServiceGetApiMasterPatientDocumentByPatientDocumentIdData = (queryClient: QueryClient, { patientDocumentId }: {
  patientDocumentId: string;
}) => queryClient.ensureQueryData({ queryKey: Common.UsePatientDocumentControllerServiceGetApiMasterPatientDocumentByPatientDocumentIdKeyFn({ patientDocumentId }), queryFn: () => PatientDocumentControllerService.getApiMasterPatientDocumentByPatientDocumentId({ patientDocumentId }) });
export const ensureUsePatientDocumentControllerServiceGetApiMasterPatientDocumentListData = (queryClient: QueryClient, { archive, assigned, page, patientId, size, sortBy, sortDirection, status }: {
  archive?: boolean;
  assigned?: boolean;
  page?: number;
  patientId?: string;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
  status?: boolean;
} = {}) => queryClient.ensureQueryData({ queryKey: Common.UsePatientDocumentControllerServiceGetApiMasterPatientDocumentListKeyFn({ archive, assigned, page, patientId, size, sortBy, sortDirection, status }), queryFn: () => PatientDocumentControllerService.getApiMasterPatientDocumentList({ archive, assigned, page, patientId, size, sortBy, sortDirection, status }) });
export const ensureUsePatientDiagnosisControllerServiceGetApiMasterPatientDiagnosisData = (queryClient: QueryClient, { archive, page, patientClinicUuid, searchString, size, sortBy, sortDirection, status }: {
  archive?: boolean;
  page?: number;
  patientClinicUuid: string;
  searchString?: string;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
  status?: boolean;
}) => queryClient.ensureQueryData({ queryKey: Common.UsePatientDiagnosisControllerServiceGetApiMasterPatientDiagnosisKeyFn({ archive, page, patientClinicUuid, searchString, size, sortBy, sortDirection, status }), queryFn: () => PatientDiagnosisControllerService.getApiMasterPatientDiagnosis({ archive, page, patientClinicUuid, searchString, size, sortBy, sortDirection, status }) });
export const ensureUsePatientDiagnosisControllerServiceGetApiMasterPatientDiagnosisByPatientDiagnosisIdData = (queryClient: QueryClient, { patientDiagnosisId }: {
  patientDiagnosisId: string;
}) => queryClient.ensureQueryData({ queryKey: Common.UsePatientDiagnosisControllerServiceGetApiMasterPatientDiagnosisByPatientDiagnosisIdKeyFn({ patientDiagnosisId }), queryFn: () => PatientDiagnosisControllerService.getApiMasterPatientDiagnosisByPatientDiagnosisId({ patientDiagnosisId }) });
export const ensureUsePatientClinicControllerServiceGetApiMasterPatientClinicData = (queryClient: QueryClient, { active, archive, clinicUuid, page, patientUuid, primaryProviderUuid, searchString, size, sortBy, sortDirection }: {
  active?: boolean;
  archive?: boolean;
  clinicUuid?: string;
  page?: number;
  patientUuid?: string;
  primaryProviderUuid?: string;
  searchString?: string;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
} = {}) => queryClient.ensureQueryData({ queryKey: Common.UsePatientClinicControllerServiceGetApiMasterPatientClinicKeyFn({ active, archive, clinicUuid, page, patientUuid, primaryProviderUuid, searchString, size, sortBy, sortDirection }), queryFn: () => PatientClinicControllerService.getApiMasterPatientClinic({ active, archive, clinicUuid, page, patientUuid, primaryProviderUuid, searchString, size, sortBy, sortDirection }) });
export const ensureUsePatientClinicControllerServiceGetApiMasterPatientClinicByPatientClinicUuidData = (queryClient: QueryClient, { patientClinicUuid }: {
  patientClinicUuid: string;
}) => queryClient.ensureQueryData({ queryKey: Common.UsePatientClinicControllerServiceGetApiMasterPatientClinicByPatientClinicUuidKeyFn({ patientClinicUuid }), queryFn: () => PatientClinicControllerService.getApiMasterPatientClinicByPatientClinicUuid({ patientClinicUuid }) });
export const ensureUsePatientClinicControllerServiceGetApiMasterPatientClinicPatientByPatientUuidData = (queryClient: QueryClient, { patientUuid }: {
  patientUuid: string;
}) => queryClient.ensureQueryData({ queryKey: Common.UsePatientClinicControllerServiceGetApiMasterPatientClinicPatientByPatientUuidKeyFn({ patientUuid }), queryFn: () => PatientClinicControllerService.getApiMasterPatientClinicPatientByPatientUuid({ patientUuid }) });
export const ensureUsePatientAllergyControllerServiceGetApiMasterPatientAllergyData = (queryClient: QueryClient, { archive, page, patientClinicUuid, searchString, size, sort, sortBy, status }: {
  archive?: boolean;
  page?: number;
  patientClinicUuid: string;
  searchString?: string;
  size?: number;
  sort?: string;
  sortBy?: string;
  status?: boolean;
}) => queryClient.ensureQueryData({ queryKey: Common.UsePatientAllergyControllerServiceGetApiMasterPatientAllergyKeyFn({ archive, page, patientClinicUuid, searchString, size, sort, sortBy, status }), queryFn: () => PatientAllergyControllerService.getApiMasterPatientAllergy({ archive, page, patientClinicUuid, searchString, size, sort, sortBy, status }) });
export const ensureUsePatientAllergyControllerServiceGetApiMasterPatientAllergyByPatientAllergyIdData = (queryClient: QueryClient, { patientAllergyId }: {
  patientAllergyId: string;
}) => queryClient.ensureQueryData({ queryKey: Common.UsePatientAllergyControllerServiceGetApiMasterPatientAllergyByPatientAllergyIdKeyFn({ patientAllergyId }), queryFn: () => PatientAllergyControllerService.getApiMasterPatientAllergyByPatientAllergyId({ patientAllergyId }) });
export const ensureUseMedicalCodeControllerServiceGetApiMasterMedicalCodesData = (queryClient: QueryClient, { active, archive, page, searchString, size, sort, sortBy, type }: {
  active?: boolean;
  archive?: boolean;
  page?: number;
  searchString?: string;
  size?: number;
  sort?: string;
  sortBy?: string;
  type?: "CPT" | "ICD" | "CUSTOM" | "HCPCS" | "LOINC" | "PAYER_CATALOG" | "PATIENT" | "PROVIDER";
} = {}) => queryClient.ensureQueryData({ queryKey: Common.UseMedicalCodeControllerServiceGetApiMasterMedicalCodesKeyFn({ active, archive, page, searchString, size, sort, sortBy, type }), queryFn: () => MedicalCodeControllerService.getApiMasterMedicalCodes({ active, archive, page, searchString, size, sort, sortBy, type }) });
export const ensureUseMedicalCodeControllerServiceGetApiMasterMedicalCodesByMedicalCodeIdData = (queryClient: QueryClient, { medicalCodeId }: {
  medicalCodeId: string;
}) => queryClient.ensureQueryData({ queryKey: Common.UseMedicalCodeControllerServiceGetApiMasterMedicalCodesByMedicalCodeIdKeyFn({ medicalCodeId }), queryFn: () => MedicalCodeControllerService.getApiMasterMedicalCodesByMedicalCodeId({ medicalCodeId }) });
export const ensureUseLocationControllerServiceGetApiMasterLocationData = (queryClient: QueryClient, { archive, clinicId, page, searchString, size, sortBy, sortDirection, state, status }: {
  archive?: boolean;
  clinicId?: string;
  page?: number;
  searchString?: string;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
  state?: string;
  status?: boolean;
} = {}) => queryClient.ensureQueryData({ queryKey: Common.UseLocationControllerServiceGetApiMasterLocationKeyFn({ archive, clinicId, page, searchString, size, sortBy, sortDirection, state, status }), queryFn: () => LocationControllerService.getApiMasterLocation({ archive, clinicId, page, searchString, size, sortBy, sortDirection, state, status }) });
export const ensureUseLocationControllerServiceGetApiMasterLocationByLocationIdData = (queryClient: QueryClient, { locationId }: {
  locationId: string;
}) => queryClient.ensureQueryData({ queryKey: Common.UseLocationControllerServiceGetApiMasterLocationByLocationIdKeyFn({ locationId }), queryFn: () => LocationControllerService.getApiMasterLocationByLocationId({ locationId }) });
export const ensureUseLocationControllerServiceGetApiMasterLocationV2Data = (queryClient: QueryClient, { archive, clinicId, page, searchString, size, sortBy, sortDirection, state, status }: {
  archive?: boolean;
  clinicId?: string;
  page?: number;
  searchString?: string;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
  state?: string;
  status?: boolean;
} = {}) => queryClient.ensureQueryData({ queryKey: Common.UseLocationControllerServiceGetApiMasterLocationV2KeyFn({ archive, clinicId, page, searchString, size, sortBy, sortDirection, state, status }), queryFn: () => LocationControllerService.getApiMasterLocationV2({ archive, clinicId, page, searchString, size, sortBy, sortDirection, state, status }) });
export const ensureUseIntakeFormConsentTemplateServiceGetApiMasterIntakeFormConsentTemplateByUuidData = (queryClient: QueryClient, { uuid }: {
  uuid: string;
}) => queryClient.ensureQueryData({ queryKey: Common.UseIntakeFormConsentTemplateServiceGetApiMasterIntakeFormConsentTemplateByUuidKeyFn({ uuid }), queryFn: () => IntakeFormConsentTemplateService.getApiMasterIntakeFormConsentTemplateByUuid({ uuid }) });
export const ensureUseIntakeFormConsentTemplateServiceGetApiMasterIntakeFormConsentTemplatePatientClinicByPatientClinicUuidData = (queryClient: QueryClient, { patientClinicUuid }: {
  patientClinicUuid: string;
}) => queryClient.ensureQueryData({ queryKey: Common.UseIntakeFormConsentTemplateServiceGetApiMasterIntakeFormConsentTemplatePatientClinicByPatientClinicUuidKeyFn({ patientClinicUuid }), queryFn: () => IntakeFormConsentTemplateService.getApiMasterIntakeFormConsentTemplatePatientClinicByPatientClinicUuid({ patientClinicUuid }) });
export const ensureUseIntakeFormConsentTemplateServiceGetApiMasterIntakeFormConsentTemplatePatientClinicByPatientClinicUuidTypeByFormTypeData = (queryClient: QueryClient, { formType, patientClinicUuid }: {
  formType: "CONSENT_FORM" | "INTAKE_FORM";
  patientClinicUuid: string;
}) => queryClient.ensureQueryData({ queryKey: Common.UseIntakeFormConsentTemplateServiceGetApiMasterIntakeFormConsentTemplatePatientClinicByPatientClinicUuidTypeByFormTypeKeyFn({ formType, patientClinicUuid }), queryFn: () => IntakeFormConsentTemplateService.getApiMasterIntakeFormConsentTemplatePatientClinicByPatientClinicUuidTypeByFormType({ formType, patientClinicUuid }) });
export const ensureUseIntakeFormConsentTemplateServiceGetApiMasterIntakeFormConsentTemplateAllData = (queryClient: QueryClient, { active, formType, page, patientClinicUuid, size, sortBy, sortDirection, templateName }: {
  active?: boolean;
  formType?: "CONSENT_FORM" | "INTAKE_FORM";
  page?: number;
  patientClinicUuid?: string;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
  templateName?: string;
} = {}) => queryClient.ensureQueryData({ queryKey: Common.UseIntakeFormConsentTemplateServiceGetApiMasterIntakeFormConsentTemplateAllKeyFn({ active, formType, page, patientClinicUuid, size, sortBy, sortDirection, templateName }), queryFn: () => IntakeFormConsentTemplateService.getApiMasterIntakeFormConsentTemplateAll({ active, formType, page, patientClinicUuid, size, sortBy, sortDirection, templateName }) });
export const ensureUseFeeScheduleControllerServiceGetApiMasterFeeScheduleData = (queryClient: QueryClient, { active, archive, page, searchString, size }: {
  active?: boolean;
  archive?: boolean;
  page?: number;
  searchString?: string;
  size?: number;
} = {}) => queryClient.ensureQueryData({ queryKey: Common.UseFeeScheduleControllerServiceGetApiMasterFeeScheduleKeyFn({ active, archive, page, searchString, size }), queryFn: () => FeeScheduleControllerService.getApiMasterFeeSchedule({ active, archive, page, searchString, size }) });
export const ensureUseFeeScheduleControllerServiceGetApiMasterFeeScheduleByFeeScheduleIdData = (queryClient: QueryClient, { feeScheduleId }: {
  feeScheduleId: string;
}) => queryClient.ensureQueryData({ queryKey: Common.UseFeeScheduleControllerServiceGetApiMasterFeeScheduleByFeeScheduleIdKeyFn({ feeScheduleId }), queryFn: () => FeeScheduleControllerService.getApiMasterFeeScheduleByFeeScheduleId({ feeScheduleId }) });
export const ensureUseDocumentTypeControllerServiceGetApiMasterDocumentTypeData = (queryClient: QueryClient, { active, archive, clinicUuid, page, searchString, size, sortBy, sortDirection }: {
  active?: boolean;
  archive?: boolean;
  clinicUuid?: string;
  page?: number;
  searchString?: string;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
} = {}) => queryClient.ensureQueryData({ queryKey: Common.UseDocumentTypeControllerServiceGetApiMasterDocumentTypeKeyFn({ active, archive, clinicUuid, page, searchString, size, sortBy, sortDirection }), queryFn: () => DocumentTypeControllerService.getApiMasterDocumentType({ active, archive, clinicUuid, page, searchString, size, sortBy, sortDirection }) });
export const ensureUseDocumentTypeControllerServiceGetApiMasterDocumentTypeByDocumentTypeIdData = (queryClient: QueryClient, { documentTypeId }: {
  documentTypeId: string;
}) => queryClient.ensureQueryData({ queryKey: Common.UseDocumentTypeControllerServiceGetApiMasterDocumentTypeByDocumentTypeIdKeyFn({ documentTypeId }), queryFn: () => DocumentTypeControllerService.getApiMasterDocumentTypeByDocumentTypeId({ documentTypeId }) });
export const ensureUseDocumentTypeControllerServiceGetApiMasterDocumentTypeClinicByClinicUuidData = (queryClient: QueryClient, { clinicUuid }: {
  clinicUuid: string;
}) => queryClient.ensureQueryData({ queryKey: Common.UseDocumentTypeControllerServiceGetApiMasterDocumentTypeClinicByClinicUuidKeyFn({ clinicUuid }), queryFn: () => DocumentTypeControllerService.getApiMasterDocumentTypeClinicByClinicUuid({ clinicUuid }) });
export const ensureUseClinicalTemplateServiceGetApiMasterClinicalTemplateData = (queryClient: QueryClient, { active, clinicUuid, page, size, sortBy, sortDirection, templateType, title }: {
  active?: boolean;
  clinicUuid?: string;
  page?: number;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
  templateType?: "ROS" | "PE" | "SOAP_NOTE" | "SIMPLE_NOTE" | "CONSULTATION_NOTE";
  title?: string;
} = {}) => queryClient.ensureQueryData({ queryKey: Common.UseClinicalTemplateServiceGetApiMasterClinicalTemplateKeyFn({ active, clinicUuid, page, size, sortBy, sortDirection, templateType, title }), queryFn: () => ClinicalTemplateService.getApiMasterClinicalTemplate({ active, clinicUuid, page, size, sortBy, sortDirection, templateType, title }) });
export const ensureUseClinicalTemplateServiceGetApiMasterClinicalTemplateByTemplateIdData = (queryClient: QueryClient, { templateId }: {
  templateId: string;
}) => queryClient.ensureQueryData({ queryKey: Common.UseClinicalTemplateServiceGetApiMasterClinicalTemplateByTemplateIdKeyFn({ templateId }), queryFn: () => ClinicalTemplateService.getApiMasterClinicalTemplateByTemplateId({ templateId }) });
export const ensureUseClinicalTemplateServiceGetApiMasterClinicalTemplateClinicByClinicUuidData = (queryClient: QueryClient, { clinicUuid }: {
  clinicUuid: string;
}) => queryClient.ensureQueryData({ queryKey: Common.UseClinicalTemplateServiceGetApiMasterClinicalTemplateClinicByClinicUuidKeyFn({ clinicUuid }), queryFn: () => ClinicalTemplateService.getApiMasterClinicalTemplateClinicByClinicUuid({ clinicUuid }) });
export const ensureUseClinicalTemplateServiceGetApiMasterClinicalTemplateClinicByClinicUuidTypeByTemplateTypeData = (queryClient: QueryClient, { clinicUuid, templateType }: {
  clinicUuid: string;
  templateType: "ROS" | "PE" | "SOAP_NOTE" | "SIMPLE_NOTE" | "CONSULTATION_NOTE";
}) => queryClient.ensureQueryData({ queryKey: Common.UseClinicalTemplateServiceGetApiMasterClinicalTemplateClinicByClinicUuidTypeByTemplateTypeKeyFn({ clinicUuid, templateType }), queryFn: () => ClinicalTemplateService.getApiMasterClinicalTemplateClinicByClinicUuidTypeByTemplateType({ clinicUuid, templateType }) });
export const ensureUseClinicControllerServiceGetApiMasterClinicData = (queryClient: QueryClient, { archive, page, searchString, size, sortBy, sortDirection, state, status }: {
  archive?: boolean;
  page?: number;
  searchString?: string;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
  state?: string;
  status?: boolean;
} = {}) => queryClient.ensureQueryData({ queryKey: Common.UseClinicControllerServiceGetApiMasterClinicKeyFn({ archive, page, searchString, size, sortBy, sortDirection, state, status }), queryFn: () => ClinicControllerService.getApiMasterClinic({ archive, page, searchString, size, sortBy, sortDirection, state, status }) });
export const ensureUseClinicControllerServiceGetApiMasterClinicByClinicIdData = (queryClient: QueryClient, { clinicId }: {
  clinicId: string;
}) => queryClient.ensureQueryData({ queryKey: Common.UseClinicControllerServiceGetApiMasterClinicByClinicIdKeyFn({ clinicId }), queryFn: () => ClinicControllerService.getApiMasterClinicByClinicId({ clinicId }) });
export const ensureUseAppointmentManagementServiceGetApiMasterAppointmentsData = (queryClient: QueryClient, { active, appointmentModes, appointmentStatuses, appointmentTypes, archive, clinicUuid, endDate, locationUuid, page, patientUuid, providerUuid, searchString, size, sortBy, sortDirection, startDate, timeFilter }: {
  active?: boolean;
  appointmentModes?: string;
  appointmentStatuses?: string;
  appointmentTypes?: string;
  archive?: boolean;
  clinicUuid?: string;
  endDate?: string;
  locationUuid?: string[];
  page?: number;
  patientUuid?: string;
  providerUuid?: string[];
  searchString?: string;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
  startDate?: string;
  timeFilter?: "ALL" | "UPCOMING" | "PAST";
} = {}) => queryClient.ensureQueryData({ queryKey: Common.UseAppointmentManagementServiceGetApiMasterAppointmentsKeyFn({ active, appointmentModes, appointmentStatuses, appointmentTypes, archive, clinicUuid, endDate, locationUuid, page, patientUuid, providerUuid, searchString, size, sortBy, sortDirection, startDate, timeFilter }), queryFn: () => AppointmentManagementService.getApiMasterAppointments({ active, appointmentModes, appointmentStatuses, appointmentTypes, archive, clinicUuid, endDate, locationUuid, page, patientUuid, providerUuid, searchString, size, sortBy, sortDirection, startDate, timeFilter }) });
export const ensureUseAppointmentManagementServiceGetApiMasterAppointmentsByAppointmentIdData = (queryClient: QueryClient, { appointmentId }: {
  appointmentId: string;
}) => queryClient.ensureQueryData({ queryKey: Common.UseAppointmentManagementServiceGetApiMasterAppointmentsByAppointmentIdKeyFn({ appointmentId }), queryFn: () => AppointmentManagementService.getApiMasterAppointmentsByAppointmentId({ appointmentId }) });
export const ensureUseAppointmentManagementServiceGetApiMasterAppointmentsTodayData = (queryClient: QueryClient) => queryClient.ensureQueryData({ queryKey: Common.UseAppointmentManagementServiceGetApiMasterAppointmentsTodayKeyFn(), queryFn: () => AppointmentManagementService.getApiMasterAppointmentsToday() });
export const ensureUseAppointmentTypeManagementServiceGetApiMasterAppointmentTypesByUuidData = (queryClient: QueryClient, { uuid }: {
  uuid: string;
}) => queryClient.ensureQueryData({ queryKey: Common.UseAppointmentTypeManagementServiceGetApiMasterAppointmentTypesByUuidKeyFn({ uuid }), queryFn: () => AppointmentTypeManagementService.getApiMasterAppointmentTypesByUuid({ uuid }) });
export const ensureUseAppointmentTypeManagementServiceGetApiMasterAppointmentTypesData = (queryClient: QueryClient, { page, size, title }: {
  page?: number;
  size?: number;
  title?: string;
} = {}) => queryClient.ensureQueryData({ queryKey: Common.UseAppointmentTypeManagementServiceGetApiMasterAppointmentTypesKeyFn({ page, size, title }), queryFn: () => AppointmentTypeManagementService.getApiMasterAppointmentTypes({ page, size, title }) });
export const ensureUseStripeControllerServiceGetApiMasterStripeByClinicIdData = (queryClient: QueryClient, { clinicId }: {
  clinicId: string;
}) => queryClient.ensureQueryData({ queryKey: Common.UseStripeControllerServiceGetApiMasterStripeByClinicIdKeyFn({ clinicId }), queryFn: () => StripeControllerService.getApiMasterStripeByClinicId({ clinicId }) });
export const ensureUseStripeControllerServiceGetApiMasterStripePaymentMethodByPatientClinicUuidData = (queryClient: QueryClient, { active, archive, page, patientClinicUuid, size, sortBy, sortDirection }: {
  active?: boolean;
  archive?: boolean;
  page?: number;
  patientClinicUuid: string;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
}) => queryClient.ensureQueryData({ queryKey: Common.UseStripeControllerServiceGetApiMasterStripePaymentMethodByPatientClinicUuidKeyFn({ active, archive, page, patientClinicUuid, size, sortBy, sortDirection }), queryFn: () => StripeControllerService.getApiMasterStripePaymentMethodByPatientClinicUuid({ active, archive, page, patientClinicUuid, size, sortBy, sortDirection }) });
export const ensureUseSpecialityControllerServiceGetApiMasterSpecialityData = (queryClient: QueryClient, { page, size, sortBy, sortDirection }: {
  page?: number;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
} = {}) => queryClient.ensureQueryData({ queryKey: Common.UseSpecialityControllerServiceGetApiMasterSpecialityKeyFn({ page, size, sortBy, sortDirection }), queryFn: () => SpecialityControllerService.getApiMasterSpeciality({ page, size, sortBy, sortDirection }) });
export const ensureUseSpecialityControllerServiceGetApiMasterSpecialityAllData = (queryClient: QueryClient) => queryClient.ensureQueryData({ queryKey: Common.UseSpecialityControllerServiceGetApiMasterSpecialityAllKeyFn(), queryFn: () => SpecialityControllerService.getApiMasterSpecialityAll() });
export const ensureUseRequestAppointmentManagementServiceGetApiMasterRequestAppointmentByUuidData = (queryClient: QueryClient, { uuid }: {
  uuid: string;
}) => queryClient.ensureQueryData({ queryKey: Common.UseRequestAppointmentManagementServiceGetApiMasterRequestAppointmentByUuidKeyFn({ uuid }), queryFn: () => RequestAppointmentManagementService.getApiMasterRequestAppointmentByUuid({ uuid }) });
export const ensureUseRequestAppointmentManagementServiceGetApiMasterRequestAppointmentAllData = (queryClient: QueryClient, { active, archive, clinicUuid, page, patientUuid, providerUuid, size, sortBy, sortDirection, status }: {
  active?: boolean;
  archive?: boolean;
  clinicUuid?: string;
  page?: number;
  patientUuid?: string;
  providerUuid?: string;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
  status?: "PENDING" | "APPROVED" | "REJECTED";
} = {}) => queryClient.ensureQueryData({ queryKey: Common.UseRequestAppointmentManagementServiceGetApiMasterRequestAppointmentAllKeyFn({ active, archive, clinicUuid, page, patientUuid, providerUuid, size, sortBy, sortDirection, status }), queryFn: () => RequestAppointmentManagementService.getApiMasterRequestAppointmentAll({ active, archive, clinicUuid, page, patientUuid, providerUuid, size, sortBy, sortDirection, status }) });
export const ensureUseAvailabilityManagementServiceGetApiMasterSlotsData = (queryClient: QueryClient, { appointmentTypeUuid, availabilityMode, clinicUuid, endDate, locationUuid, providerUuid, startDate }: {
  appointmentTypeUuid: string;
  availabilityMode?: "IN_PERSON" | "VIRTUAL" | "HOME";
  clinicUuid?: string;
  endDate?: string;
  locationUuid?: string;
  providerUuid: string;
  startDate?: string;
}) => queryClient.ensureQueryData({ queryKey: Common.UseAvailabilityManagementServiceGetApiMasterSlotsKeyFn({ appointmentTypeUuid, availabilityMode, clinicUuid, endDate, locationUuid, providerUuid, startDate }), queryFn: () => AvailabilityManagementService.getApiMasterSlots({ appointmentTypeUuid, availabilityMode, clinicUuid, endDate, locationUuid, providerUuid, startDate }) });
export const ensureUseAvailabilityManagementServiceGetApiMasterProviderByProviderUuidAvailabilitySettingData = (queryClient: QueryClient, { providerUuid }: {
  providerUuid: string;
}) => queryClient.ensureQueryData({ queryKey: Common.UseAvailabilityManagementServiceGetApiMasterProviderByProviderUuidAvailabilitySettingKeyFn({ providerUuid }), queryFn: () => AvailabilityManagementService.getApiMasterProviderByProviderUuidAvailabilitySetting({ providerUuid }) });
export const ensureUsePharmacyLabRadiologyControllerServiceGetApiMasterPharmacyLabRadiologyData = (queryClient: QueryClient, { page, searchString, size, sortBy, sortDirection, type }: {
  page?: number;
  searchString?: string;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
  type?: "LAB" | "PHARMACY" | "RADIOLOGY";
} = {}) => queryClient.ensureQueryData({ queryKey: Common.UsePharmacyLabRadiologyControllerServiceGetApiMasterPharmacyLabRadiologyKeyFn({ page, searchString, size, sortBy, sortDirection, type }), queryFn: () => PharmacyLabRadiologyControllerService.getApiMasterPharmacyLabRadiology({ page, searchString, size, sortBy, sortDirection, type }) });
export const ensureUsePharmacyLabRadiologyControllerServiceGetApiMasterPharmacyLabRadiologyByPreferenceUuidData = (queryClient: QueryClient, { preferenceUuid }: {
  preferenceUuid: string;
}) => queryClient.ensureQueryData({ queryKey: Common.UsePharmacyLabRadiologyControllerServiceGetApiMasterPharmacyLabRadiologyByPreferenceUuidKeyFn({ preferenceUuid }), queryFn: () => PharmacyLabRadiologyControllerService.getApiMasterPharmacyLabRadiologyByPreferenceUuid({ preferenceUuid }) });
export const ensureUseMigrationControllerServiceGetApiMasterDataImportData = (queryClient: QueryClient, { clinicUuid, page, size, sortBy, sortDirection, type }: {
  clinicUuid?: string;
  page?: number;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
  type?: "CPT" | "ICD" | "CUSTOM" | "HCPCS" | "LOINC" | "PAYER_CATALOG" | "PATIENT" | "PROVIDER";
} = {}) => queryClient.ensureQueryData({ queryKey: Common.UseMigrationControllerServiceGetApiMasterDataImportKeyFn({ clinicUuid, page, size, sortBy, sortDirection, type }), queryFn: () => MigrationControllerService.getApiMasterDataImport({ clinicUuid, page, size, sortBy, sortDirection, type }) });
export const ensureUseMigrationControllerServiceGetApiMasterDataImportSampleByCategoryData = (queryClient: QueryClient, { category }: {
  category: "CPT" | "ICD" | "CUSTOM" | "HCPCS" | "LOINC" | "PAYER_CATALOG" | "PATIENT" | "PROVIDER";
}) => queryClient.ensureQueryData({ queryKey: Common.UseMigrationControllerServiceGetApiMasterDataImportSampleByCategoryKeyFn({ category }), queryFn: () => MigrationControllerService.getApiMasterDataImportSampleByCategory({ category }) });
export const ensureUseVideoControllerServiceGetApiMasterVideoTokenByRoomData = (queryClient: QueryClient, { authorization, room }: {
  authorization?: string;
  room: string;
}) => queryClient.ensureQueryData({ queryKey: Common.UseVideoControllerServiceGetApiMasterVideoTokenByRoomKeyFn({ authorization, room }), queryFn: () => VideoControllerService.getApiMasterVideoTokenByRoom({ authorization, room }) });
export const ensureUseVaccinesControllerServiceGetApiMasterVaccineData = (queryClient: QueryClient, { page, searchString, size, sortBy, sortDirection }: {
  page?: number;
  searchString?: string;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
} = {}) => queryClient.ensureQueryData({ queryKey: Common.UseVaccinesControllerServiceGetApiMasterVaccineKeyFn({ page, searchString, size, sortBy, sortDirection }), queryFn: () => VaccinesControllerService.getApiMasterVaccine({ page, searchString, size, sortBy, sortDirection }) });
export const ensureUseLicenseStateControllerServiceGetApiMasterStateListData = (queryClient: QueryClient, { page, searchString, size }: {
  page?: number;
  searchString?: string;
  size?: number;
} = {}) => queryClient.ensureQueryData({ queryKey: Common.UseLicenseStateControllerServiceGetApiMasterStateListKeyFn({ page, searchString, size }), queryFn: () => LicenseStateControllerService.getApiMasterStateList({ page, searchString, size }) });
export const ensureUseInsurancePayerControllerServiceGetApiMasterInsurancePayersData = (queryClient: QueryClient, { page, searchString, size, sortBy, sortDirection }: {
  page?: number;
  searchString?: string;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
} = {}) => queryClient.ensureQueryData({ queryKey: Common.UseInsurancePayerControllerServiceGetApiMasterInsurancePayersKeyFn({ page, searchString, size, sortBy, sortDirection }), queryFn: () => InsurancePayerControllerService.getApiMasterInsurancePayers({ page, searchString, size, sortBy, sortDirection }) });
export const ensureUseAllergyControllerServiceGetApiMasterAllergyData = (queryClient: QueryClient, { page, size, sort, sortBy }: {
  page?: number;
  size?: number;
  sort?: string;
  sortBy?: string;
} = {}) => queryClient.ensureQueryData({ queryKey: Common.UseAllergyControllerServiceGetApiMasterAllergyKeyFn({ page, size, sort, sortBy }), queryFn: () => AllergyControllerService.getApiMasterAllergy({ page, size, sort, sortBy }) });
