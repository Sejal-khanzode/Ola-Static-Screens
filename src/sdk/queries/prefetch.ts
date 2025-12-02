// generated with @7nohe/openapi-react-query-codegen@1.6.2 

import { type QueryClient } from "@tanstack/react-query";
import { AllergyControllerService, AppointmentManagementService, AppointmentTypeManagementService, AvailabilityManagementService, ClinicControllerService, ClinicalTemplateService, DocumentTypeControllerService, FeeScheduleControllerService, InsurancePayerControllerService, IntakeFormConsentTemplateService, LicenseStateControllerService, LocationControllerService, MedicalCodeControllerService, MigrationControllerService, PatientAllergyControllerService, PatientClinicControllerService, PatientControllerService, PatientDiagnosisControllerService, PatientDocumentControllerService, PatientFamilyHistoryControllerService, PatientFlagControllerService, PatientInsuranceControllerService, PatientMedicalHistoryControllerService, PatientSurgicalHistoryControllerService, PatientVaccineControllerService, PharmacyLabRadiologyControllerService, PrintConfigurationControllerService, ProviderControllerService, RequestAppointmentManagementService, SpecialityControllerService, StickyNoteControllerService, StripeControllerService, TextMacroControllerService, UserControllerService, VaccinesControllerService, VideoControllerService, VisitNoteTemplateService } from "../requests/services.gen";
import * as Common from "./common";
export const prefetchUseUserControllerServiceGetApiMasterUsers = (queryClient: QueryClient, { archive, clinicId, page, searchString, size, sortBy, sortDirection, status }: {
  archive?: boolean;
  clinicId?: string;
  page?: number;
  searchString?: string;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
  status?: boolean;
} = {}) => queryClient.prefetchQuery({ queryKey: Common.UseUserControllerServiceGetApiMasterUsersKeyFn({ archive, clinicId, page, searchString, size, sortBy, sortDirection, status }), queryFn: () => UserControllerService.getApiMasterUsers({ archive, clinicId, page, searchString, size, sortBy, sortDirection, status }) });
export const prefetchUseUserControllerServiceGetApiMasterUserByUserId = (queryClient: QueryClient, { userId }: {
  userId: string;
}) => queryClient.prefetchQuery({ queryKey: Common.UseUserControllerServiceGetApiMasterUserByUserIdKeyFn({ userId }), queryFn: () => UserControllerService.getApiMasterUserByUserId({ userId }) });
export const prefetchUseUserControllerServiceGetApiMasterProfile = (queryClient: QueryClient) => queryClient.prefetchQuery({ queryKey: Common.UseUserControllerServiceGetApiMasterProfileKeyFn(), queryFn: () => UserControllerService.getApiMasterProfile() });
export const prefetchUseVisitNoteTemplateServiceGetApiMasterVisitNoteTemplate = (queryClient: QueryClient, { active, clinicUuid, page, size, sortBy, sortDirection, templateName, templateType }: {
  active?: boolean;
  clinicUuid?: string;
  page?: number;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
  templateName?: string;
  templateType?: "ROS" | "PE" | "SOAP_NOTE" | "SIMPLE_NOTE" | "CONSULTATION_NOTE";
} = {}) => queryClient.prefetchQuery({ queryKey: Common.UseVisitNoteTemplateServiceGetApiMasterVisitNoteTemplateKeyFn({ active, clinicUuid, page, size, sortBy, sortDirection, templateName, templateType }), queryFn: () => VisitNoteTemplateService.getApiMasterVisitNoteTemplate({ active, clinicUuid, page, size, sortBy, sortDirection, templateName, templateType }) });
export const prefetchUseVisitNoteTemplateServiceGetApiMasterVisitNoteTemplateByTemplateId = (queryClient: QueryClient, { templateId }: {
  templateId: string;
}) => queryClient.prefetchQuery({ queryKey: Common.UseVisitNoteTemplateServiceGetApiMasterVisitNoteTemplateByTemplateIdKeyFn({ templateId }), queryFn: () => VisitNoteTemplateService.getApiMasterVisitNoteTemplateByTemplateId({ templateId }) });
export const prefetchUseVisitNoteTemplateServiceGetApiMasterVisitNoteTemplateClinicByClinicUuid = (queryClient: QueryClient, { clinicUuid }: {
  clinicUuid: string;
}) => queryClient.prefetchQuery({ queryKey: Common.UseVisitNoteTemplateServiceGetApiMasterVisitNoteTemplateClinicByClinicUuidKeyFn({ clinicUuid }), queryFn: () => VisitNoteTemplateService.getApiMasterVisitNoteTemplateClinicByClinicUuid({ clinicUuid }) });
export const prefetchUseVisitNoteTemplateServiceGetApiMasterVisitNoteTemplateClinicByClinicUuidTypeByTemplateType = (queryClient: QueryClient, { clinicUuid, templateType }: {
  clinicUuid: string;
  templateType: "ROS" | "PE" | "SOAP_NOTE" | "SIMPLE_NOTE" | "CONSULTATION_NOTE";
}) => queryClient.prefetchQuery({ queryKey: Common.UseVisitNoteTemplateServiceGetApiMasterVisitNoteTemplateClinicByClinicUuidTypeByTemplateTypeKeyFn({ clinicUuid, templateType }), queryFn: () => VisitNoteTemplateService.getApiMasterVisitNoteTemplateClinicByClinicUuidTypeByTemplateType({ clinicUuid, templateType }) });
export const prefetchUseTextMacroControllerServiceGetApiMasterTextMacro = (queryClient: QueryClient, { clinicUuid, page, size, sortBy, sortDirection, title }: {
  clinicUuid?: string;
  page?: number;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
  title?: string;
} = {}) => queryClient.prefetchQuery({ queryKey: Common.UseTextMacroControllerServiceGetApiMasterTextMacroKeyFn({ clinicUuid, page, size, sortBy, sortDirection, title }), queryFn: () => TextMacroControllerService.getApiMasterTextMacro({ clinicUuid, page, size, sortBy, sortDirection, title }) });
export const prefetchUseTextMacroControllerServiceGetApiMasterTextMacroByTextMacroId = (queryClient: QueryClient, { textMacroId }: {
  textMacroId: string;
}) => queryClient.prefetchQuery({ queryKey: Common.UseTextMacroControllerServiceGetApiMasterTextMacroByTextMacroIdKeyFn({ textMacroId }), queryFn: () => TextMacroControllerService.getApiMasterTextMacroByTextMacroId({ textMacroId }) });
export const prefetchUseStickyNoteControllerServiceGetApiMasterStickyNotes = (queryClient: QueryClient, { archive, page, patientClinicUuid, size, sort, sortBy, status }: {
  archive?: boolean;
  page?: number;
  patientClinicUuid: string;
  size?: number;
  sort?: string;
  sortBy?: string;
  status?: boolean;
}) => queryClient.prefetchQuery({ queryKey: Common.UseStickyNoteControllerServiceGetApiMasterStickyNotesKeyFn({ archive, page, patientClinicUuid, size, sort, sortBy, status }), queryFn: () => StickyNoteControllerService.getApiMasterStickyNotes({ archive, page, patientClinicUuid, size, sort, sortBy, status }) });
export const prefetchUseStickyNoteControllerServiceGetApiMasterStickyNotesByStickyNoteId = (queryClient: QueryClient, { stickyNoteId }: {
  stickyNoteId: string;
}) => queryClient.prefetchQuery({ queryKey: Common.UseStickyNoteControllerServiceGetApiMasterStickyNotesByStickyNoteIdKeyFn({ stickyNoteId }), queryFn: () => StickyNoteControllerService.getApiMasterStickyNotesByStickyNoteId({ stickyNoteId }) });
export const prefetchUseProviderControllerServiceGetApiMasterProvider = (queryClient: QueryClient, { archive, clinicId, page, searchString, size, sortBy, sortDirection, status }: {
  archive?: boolean;
  clinicId?: string;
  page?: number;
  searchString?: string;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
  status?: boolean;
} = {}) => queryClient.prefetchQuery({ queryKey: Common.UseProviderControllerServiceGetApiMasterProviderKeyFn({ archive, clinicId, page, searchString, size, sortBy, sortDirection, status }), queryFn: () => ProviderControllerService.getApiMasterProvider({ archive, clinicId, page, searchString, size, sortBy, sortDirection, status }) });
export const prefetchUseProviderControllerServiceGetApiMasterProviderByProviderId = (queryClient: QueryClient, { providerId }: {
  providerId: string;
}) => queryClient.prefetchQuery({ queryKey: Common.UseProviderControllerServiceGetApiMasterProviderByProviderIdKeyFn({ providerId }), queryFn: () => ProviderControllerService.getApiMasterProviderByProviderId({ providerId }) });
export const prefetchUseProviderControllerServiceGetApiMasterProviderByProviderIdClinics = (queryClient: QueryClient, { active, archive, isProvider, providerId }: {
  active?: boolean;
  archive?: boolean;
  isProvider?: boolean;
  providerId: string;
}) => queryClient.prefetchQuery({ queryKey: Common.UseProviderControllerServiceGetApiMasterProviderByProviderIdClinicsKeyFn({ active, archive, isProvider, providerId }), queryFn: () => ProviderControllerService.getApiMasterProviderByProviderIdClinics({ active, archive, isProvider, providerId }) });
export const prefetchUseProviderControllerServiceGetApiMasterProviderUserByUserUuid = (queryClient: QueryClient, { userUuid }: {
  userUuid: string;
}) => queryClient.prefetchQuery({ queryKey: Common.UseProviderControllerServiceGetApiMasterProviderUserByUserUuidKeyFn({ userUuid }), queryFn: () => ProviderControllerService.getApiMasterProviderUserByUserUuid({ userUuid }) });
export const prefetchUseProviderControllerServiceGetApiMasterProviderProfile = (queryClient: QueryClient) => queryClient.prefetchQuery({ queryKey: Common.UseProviderControllerServiceGetApiMasterProviderProfileKeyFn(), queryFn: () => ProviderControllerService.getApiMasterProviderProfile() });
export const prefetchUseProviderControllerServiceGetApiMasterProviderCounts = (queryClient: QueryClient) => queryClient.prefetchQuery({ queryKey: Common.UseProviderControllerServiceGetApiMasterProviderCountsKeyFn(), queryFn: () => ProviderControllerService.getApiMasterProviderCounts() });
export const prefetchUsePrintConfigurationControllerServiceGetApiMasterPrintConfigurationClinicByClinicUuid = (queryClient: QueryClient, { clinicUuid }: {
  clinicUuid: string;
}) => queryClient.prefetchQuery({ queryKey: Common.UsePrintConfigurationControllerServiceGetApiMasterPrintConfigurationClinicByClinicUuidKeyFn({ clinicUuid }), queryFn: () => PrintConfigurationControllerService.getApiMasterPrintConfigurationClinicByClinicUuid({ clinicUuid }) });
export const prefetchUsePatientControllerServiceGetApiMasterPatient = (queryClient: QueryClient, { archive, page, searchString, size, sortBy, sortDirection, status }: {
  archive?: boolean;
  page?: number;
  searchString?: string;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
  status?: boolean;
} = {}) => queryClient.prefetchQuery({ queryKey: Common.UsePatientControllerServiceGetApiMasterPatientKeyFn({ archive, page, searchString, size, sortBy, sortDirection, status }), queryFn: () => PatientControllerService.getApiMasterPatient({ archive, page, searchString, size, sortBy, sortDirection, status }) });
export const prefetchUsePatientControllerServiceGetApiMasterPatientByPatientId = (queryClient: QueryClient, { patientId }: {
  patientId: string;
}) => queryClient.prefetchQuery({ queryKey: Common.UsePatientControllerServiceGetApiMasterPatientByPatientIdKeyFn({ patientId }), queryFn: () => PatientControllerService.getApiMasterPatientByPatientId({ patientId }) });
export const prefetchUsePatientControllerServiceGetApiMasterPatientByPatientIdSignature = (queryClient: QueryClient, { patientId }: {
  patientId: string;
}) => queryClient.prefetchQuery({ queryKey: Common.UsePatientControllerServiceGetApiMasterPatientByPatientIdSignatureKeyFn({ patientId }), queryFn: () => PatientControllerService.getApiMasterPatientByPatientIdSignature({ patientId }) });
export const prefetchUsePatientControllerServiceGetApiMasterPatientProfile = (queryClient: QueryClient) => queryClient.prefetchQuery({ queryKey: Common.UsePatientControllerServiceGetApiMasterPatientProfileKeyFn(), queryFn: () => PatientControllerService.getApiMasterPatientProfile() });
export const prefetchUsePatientVaccineControllerServiceGetApiMasterPatientVaccine = (queryClient: QueryClient, { archive, page, patientClinicUuid, searchString, size, sort, sortBy, status }: {
  archive?: boolean;
  page?: number;
  patientClinicUuid: string;
  searchString?: string;
  size?: number;
  sort?: string;
  sortBy?: string;
  status?: boolean;
}) => queryClient.prefetchQuery({ queryKey: Common.UsePatientVaccineControllerServiceGetApiMasterPatientVaccineKeyFn({ archive, page, patientClinicUuid, searchString, size, sort, sortBy, status }), queryFn: () => PatientVaccineControllerService.getApiMasterPatientVaccine({ archive, page, patientClinicUuid, searchString, size, sort, sortBy, status }) });
export const prefetchUsePatientVaccineControllerServiceGetApiMasterPatientVaccineByPatientVaccineId = (queryClient: QueryClient, { patientVaccineId }: {
  patientVaccineId: string;
}) => queryClient.prefetchQuery({ queryKey: Common.UsePatientVaccineControllerServiceGetApiMasterPatientVaccineByPatientVaccineIdKeyFn({ patientVaccineId }), queryFn: () => PatientVaccineControllerService.getApiMasterPatientVaccineByPatientVaccineId({ patientVaccineId }) });
export const prefetchUsePatientSurgicalHistoryControllerServiceGetApiMasterPatientSurgicalHistory = (queryClient: QueryClient, { archive, page, patientClinicUuid, searchString, size, sort, sortBy, status }: {
  archive?: boolean;
  page?: number;
  patientClinicUuid: string;
  searchString?: string;
  size?: number;
  sort?: string;
  sortBy?: string;
  status?: boolean;
}) => queryClient.prefetchQuery({ queryKey: Common.UsePatientSurgicalHistoryControllerServiceGetApiMasterPatientSurgicalHistoryKeyFn({ archive, page, patientClinicUuid, searchString, size, sort, sortBy, status }), queryFn: () => PatientSurgicalHistoryControllerService.getApiMasterPatientSurgicalHistory({ archive, page, patientClinicUuid, searchString, size, sort, sortBy, status }) });
export const prefetchUsePatientSurgicalHistoryControllerServiceGetApiMasterPatientSurgicalHistoryByPatientSurgicalHistoryId = (queryClient: QueryClient, { patientSurgicalHistoryId }: {
  patientSurgicalHistoryId: string;
}) => queryClient.prefetchQuery({ queryKey: Common.UsePatientSurgicalHistoryControllerServiceGetApiMasterPatientSurgicalHistoryByPatientSurgicalHistoryIdKeyFn({ patientSurgicalHistoryId }), queryFn: () => PatientSurgicalHistoryControllerService.getApiMasterPatientSurgicalHistoryByPatientSurgicalHistoryId({ patientSurgicalHistoryId }) });
export const prefetchUsePatientMedicalHistoryControllerServiceGetApiMasterPatientMedicalHistory = (queryClient: QueryClient, { archive, page, patientClinicUuid, searchString, size, sort, sortBy, status }: {
  archive?: boolean;
  page?: number;
  patientClinicUuid: string;
  searchString?: string;
  size?: number;
  sort?: string;
  sortBy?: string;
  status?: boolean;
}) => queryClient.prefetchQuery({ queryKey: Common.UsePatientMedicalHistoryControllerServiceGetApiMasterPatientMedicalHistoryKeyFn({ archive, page, patientClinicUuid, searchString, size, sort, sortBy, status }), queryFn: () => PatientMedicalHistoryControllerService.getApiMasterPatientMedicalHistory({ archive, page, patientClinicUuid, searchString, size, sort, sortBy, status }) });
export const prefetchUsePatientMedicalHistoryControllerServiceGetApiMasterPatientMedicalHistoryByPatientMedicalHistoryId = (queryClient: QueryClient, { patientMedicalHistoryId }: {
  patientMedicalHistoryId: string;
}) => queryClient.prefetchQuery({ queryKey: Common.UsePatientMedicalHistoryControllerServiceGetApiMasterPatientMedicalHistoryByPatientMedicalHistoryIdKeyFn({ patientMedicalHistoryId }), queryFn: () => PatientMedicalHistoryControllerService.getApiMasterPatientMedicalHistoryByPatientMedicalHistoryId({ patientMedicalHistoryId }) });
export const prefetchUsePatientInsuranceControllerServiceGetApiMasterPatientInsurance = (queryClient: QueryClient, { active, archive, clinicUuid, insuranceType, page, patientClinicUuid, searchString, size, sortBy, sortDirection }: {
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
} = {}) => queryClient.prefetchQuery({ queryKey: Common.UsePatientInsuranceControllerServiceGetApiMasterPatientInsuranceKeyFn({ active, archive, clinicUuid, insuranceType, page, patientClinicUuid, searchString, size, sortBy, sortDirection }), queryFn: () => PatientInsuranceControllerService.getApiMasterPatientInsurance({ active, archive, clinicUuid, insuranceType, page, patientClinicUuid, searchString, size, sortBy, sortDirection }) });
export const prefetchUsePatientInsuranceControllerServiceGetApiMasterPatientInsuranceByPatientInsuranceId = (queryClient: QueryClient, { patientInsuranceId }: {
  patientInsuranceId: string;
}) => queryClient.prefetchQuery({ queryKey: Common.UsePatientInsuranceControllerServiceGetApiMasterPatientInsuranceByPatientInsuranceIdKeyFn({ patientInsuranceId }), queryFn: () => PatientInsuranceControllerService.getApiMasterPatientInsuranceByPatientInsuranceId({ patientInsuranceId }) });
export const prefetchUsePatientInsuranceControllerServiceGetApiMasterPatientInsurancePatientClinicByPatientClinicUuid = (queryClient: QueryClient, { active, archive, patientClinicUuid }: {
  active?: boolean;
  archive?: boolean;
  patientClinicUuid: string;
}) => queryClient.prefetchQuery({ queryKey: Common.UsePatientInsuranceControllerServiceGetApiMasterPatientInsurancePatientClinicByPatientClinicUuidKeyFn({ active, archive, patientClinicUuid }), queryFn: () => PatientInsuranceControllerService.getApiMasterPatientInsurancePatientClinicByPatientClinicUuid({ active, archive, patientClinicUuid }) });
export const prefetchUsePatientFlagControllerServiceGetApiMasterPatientFlag = (queryClient: QueryClient, { archive, clinicUuid, page, searchString, size, sortBy, sortDirection, status }: {
  archive?: boolean;
  clinicUuid?: string;
  page?: number;
  searchString?: string;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
  status?: boolean;
} = {}) => queryClient.prefetchQuery({ queryKey: Common.UsePatientFlagControllerServiceGetApiMasterPatientFlagKeyFn({ archive, clinicUuid, page, searchString, size, sortBy, sortDirection, status }), queryFn: () => PatientFlagControllerService.getApiMasterPatientFlag({ archive, clinicUuid, page, searchString, size, sortBy, sortDirection, status }) });
export const prefetchUsePatientFlagControllerServiceGetApiMasterPatientFlagByPatientFlagId = (queryClient: QueryClient, { patientFlagId }: {
  patientFlagId: string;
}) => queryClient.prefetchQuery({ queryKey: Common.UsePatientFlagControllerServiceGetApiMasterPatientFlagByPatientFlagIdKeyFn({ patientFlagId }), queryFn: () => PatientFlagControllerService.getApiMasterPatientFlagByPatientFlagId({ patientFlagId }) });
export const prefetchUsePatientFlagControllerServiceGetApiMasterPatientFlagPatientClinicByPatientClinicUuid = (queryClient: QueryClient, { patientClinicUuid }: {
  patientClinicUuid: string;
}) => queryClient.prefetchQuery({ queryKey: Common.UsePatientFlagControllerServiceGetApiMasterPatientFlagPatientClinicByPatientClinicUuidKeyFn({ patientClinicUuid }), queryFn: () => PatientFlagControllerService.getApiMasterPatientFlagPatientClinicByPatientClinicUuid({ patientClinicUuid }) });
export const prefetchUsePatientFlagControllerServiceGetApiMasterPatientFlagClinicByClinicId = (queryClient: QueryClient) => queryClient.prefetchQuery({ queryKey: Common.UsePatientFlagControllerServiceGetApiMasterPatientFlagClinicByClinicIdKeyFn(), queryFn: () => PatientFlagControllerService.getApiMasterPatientFlagClinicByClinicId() });
export const prefetchUsePatientFlagControllerServiceGetApiMasterPatientFlagActive = (queryClient: QueryClient) => queryClient.prefetchQuery({ queryKey: Common.UsePatientFlagControllerServiceGetApiMasterPatientFlagActiveKeyFn(), queryFn: () => PatientFlagControllerService.getApiMasterPatientFlagActive() });
export const prefetchUsePatientFamilyHistoryControllerServiceGetApiMasterPatientFamilyHistory = (queryClient: QueryClient, { archive, page, patientClinicUuid, searchString, size, sort, sortBy, status }: {
  archive?: boolean;
  page?: number;
  patientClinicUuid: string;
  searchString?: string;
  size?: number;
  sort?: string;
  sortBy?: string;
  status?: boolean;
}) => queryClient.prefetchQuery({ queryKey: Common.UsePatientFamilyHistoryControllerServiceGetApiMasterPatientFamilyHistoryKeyFn({ archive, page, patientClinicUuid, searchString, size, sort, sortBy, status }), queryFn: () => PatientFamilyHistoryControllerService.getApiMasterPatientFamilyHistory({ archive, page, patientClinicUuid, searchString, size, sort, sortBy, status }) });
export const prefetchUsePatientFamilyHistoryControllerServiceGetApiMasterPatientFamilyHistoryByPatientFamilyHistoryId = (queryClient: QueryClient, { patientFamilyHistoryId }: {
  patientFamilyHistoryId: string;
}) => queryClient.prefetchQuery({ queryKey: Common.UsePatientFamilyHistoryControllerServiceGetApiMasterPatientFamilyHistoryByPatientFamilyHistoryIdKeyFn({ patientFamilyHistoryId }), queryFn: () => PatientFamilyHistoryControllerService.getApiMasterPatientFamilyHistoryByPatientFamilyHistoryId({ patientFamilyHistoryId }) });
export const prefetchUsePatientDocumentControllerServiceGetApiMasterPatientDocumentByPatientDocumentId = (queryClient: QueryClient, { patientDocumentId }: {
  patientDocumentId: string;
}) => queryClient.prefetchQuery({ queryKey: Common.UsePatientDocumentControllerServiceGetApiMasterPatientDocumentByPatientDocumentIdKeyFn({ patientDocumentId }), queryFn: () => PatientDocumentControllerService.getApiMasterPatientDocumentByPatientDocumentId({ patientDocumentId }) });
export const prefetchUsePatientDocumentControllerServiceGetApiMasterPatientDocumentList = (queryClient: QueryClient, { archive, assigned, page, patientId, size, sortBy, sortDirection, status }: {
  archive?: boolean;
  assigned?: boolean;
  page?: number;
  patientId?: string;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
  status?: boolean;
} = {}) => queryClient.prefetchQuery({ queryKey: Common.UsePatientDocumentControllerServiceGetApiMasterPatientDocumentListKeyFn({ archive, assigned, page, patientId, size, sortBy, sortDirection, status }), queryFn: () => PatientDocumentControllerService.getApiMasterPatientDocumentList({ archive, assigned, page, patientId, size, sortBy, sortDirection, status }) });
export const prefetchUsePatientDiagnosisControllerServiceGetApiMasterPatientDiagnosis = (queryClient: QueryClient, { archive, page, patientClinicUuid, searchString, size, sortBy, sortDirection, status }: {
  archive?: boolean;
  page?: number;
  patientClinicUuid: string;
  searchString?: string;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
  status?: boolean;
}) => queryClient.prefetchQuery({ queryKey: Common.UsePatientDiagnosisControllerServiceGetApiMasterPatientDiagnosisKeyFn({ archive, page, patientClinicUuid, searchString, size, sortBy, sortDirection, status }), queryFn: () => PatientDiagnosisControllerService.getApiMasterPatientDiagnosis({ archive, page, patientClinicUuid, searchString, size, sortBy, sortDirection, status }) });
export const prefetchUsePatientDiagnosisControllerServiceGetApiMasterPatientDiagnosisByPatientDiagnosisId = (queryClient: QueryClient, { patientDiagnosisId }: {
  patientDiagnosisId: string;
}) => queryClient.prefetchQuery({ queryKey: Common.UsePatientDiagnosisControllerServiceGetApiMasterPatientDiagnosisByPatientDiagnosisIdKeyFn({ patientDiagnosisId }), queryFn: () => PatientDiagnosisControllerService.getApiMasterPatientDiagnosisByPatientDiagnosisId({ patientDiagnosisId }) });
export const prefetchUsePatientClinicControllerServiceGetApiMasterPatientClinic = (queryClient: QueryClient, { active, archive, clinicUuid, page, patientUuid, primaryProviderUuid, searchString, size, sortBy, sortDirection }: {
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
} = {}) => queryClient.prefetchQuery({ queryKey: Common.UsePatientClinicControllerServiceGetApiMasterPatientClinicKeyFn({ active, archive, clinicUuid, page, patientUuid, primaryProviderUuid, searchString, size, sortBy, sortDirection }), queryFn: () => PatientClinicControllerService.getApiMasterPatientClinic({ active, archive, clinicUuid, page, patientUuid, primaryProviderUuid, searchString, size, sortBy, sortDirection }) });
export const prefetchUsePatientClinicControllerServiceGetApiMasterPatientClinicByPatientClinicUuid = (queryClient: QueryClient, { patientClinicUuid }: {
  patientClinicUuid: string;
}) => queryClient.prefetchQuery({ queryKey: Common.UsePatientClinicControllerServiceGetApiMasterPatientClinicByPatientClinicUuidKeyFn({ patientClinicUuid }), queryFn: () => PatientClinicControllerService.getApiMasterPatientClinicByPatientClinicUuid({ patientClinicUuid }) });
export const prefetchUsePatientClinicControllerServiceGetApiMasterPatientClinicPatientByPatientUuid = (queryClient: QueryClient, { patientUuid }: {
  patientUuid: string;
}) => queryClient.prefetchQuery({ queryKey: Common.UsePatientClinicControllerServiceGetApiMasterPatientClinicPatientByPatientUuidKeyFn({ patientUuid }), queryFn: () => PatientClinicControllerService.getApiMasterPatientClinicPatientByPatientUuid({ patientUuid }) });
export const prefetchUsePatientAllergyControllerServiceGetApiMasterPatientAllergy = (queryClient: QueryClient, { archive, page, patientClinicUuid, searchString, size, sort, sortBy, status }: {
  archive?: boolean;
  page?: number;
  patientClinicUuid: string;
  searchString?: string;
  size?: number;
  sort?: string;
  sortBy?: string;
  status?: boolean;
}) => queryClient.prefetchQuery({ queryKey: Common.UsePatientAllergyControllerServiceGetApiMasterPatientAllergyKeyFn({ archive, page, patientClinicUuid, searchString, size, sort, sortBy, status }), queryFn: () => PatientAllergyControllerService.getApiMasterPatientAllergy({ archive, page, patientClinicUuid, searchString, size, sort, sortBy, status }) });
export const prefetchUsePatientAllergyControllerServiceGetApiMasterPatientAllergyByPatientAllergyId = (queryClient: QueryClient, { patientAllergyId }: {
  patientAllergyId: string;
}) => queryClient.prefetchQuery({ queryKey: Common.UsePatientAllergyControllerServiceGetApiMasterPatientAllergyByPatientAllergyIdKeyFn({ patientAllergyId }), queryFn: () => PatientAllergyControllerService.getApiMasterPatientAllergyByPatientAllergyId({ patientAllergyId }) });
export const prefetchUseMedicalCodeControllerServiceGetApiMasterMedicalCodes = (queryClient: QueryClient, { active, archive, page, searchString, size, sort, sortBy, type }: {
  active?: boolean;
  archive?: boolean;
  page?: number;
  searchString?: string;
  size?: number;
  sort?: string;
  sortBy?: string;
  type?: "CPT" | "ICD" | "CUSTOM" | "HCPCS" | "LOINC" | "PAYER_CATALOG" | "PATIENT" | "PROVIDER";
} = {}) => queryClient.prefetchQuery({ queryKey: Common.UseMedicalCodeControllerServiceGetApiMasterMedicalCodesKeyFn({ active, archive, page, searchString, size, sort, sortBy, type }), queryFn: () => MedicalCodeControllerService.getApiMasterMedicalCodes({ active, archive, page, searchString, size, sort, sortBy, type }) });
export const prefetchUseMedicalCodeControllerServiceGetApiMasterMedicalCodesByMedicalCodeId = (queryClient: QueryClient, { medicalCodeId }: {
  medicalCodeId: string;
}) => queryClient.prefetchQuery({ queryKey: Common.UseMedicalCodeControllerServiceGetApiMasterMedicalCodesByMedicalCodeIdKeyFn({ medicalCodeId }), queryFn: () => MedicalCodeControllerService.getApiMasterMedicalCodesByMedicalCodeId({ medicalCodeId }) });
export const prefetchUseLocationControllerServiceGetApiMasterLocation = (queryClient: QueryClient, { archive, clinicId, page, searchString, size, sortBy, sortDirection, state, status }: {
  archive?: boolean;
  clinicId?: string;
  page?: number;
  searchString?: string;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
  state?: string;
  status?: boolean;
} = {}) => queryClient.prefetchQuery({ queryKey: Common.UseLocationControllerServiceGetApiMasterLocationKeyFn({ archive, clinicId, page, searchString, size, sortBy, sortDirection, state, status }), queryFn: () => LocationControllerService.getApiMasterLocation({ archive, clinicId, page, searchString, size, sortBy, sortDirection, state, status }) });
export const prefetchUseLocationControllerServiceGetApiMasterLocationByLocationId = (queryClient: QueryClient, { locationId }: {
  locationId: string;
}) => queryClient.prefetchQuery({ queryKey: Common.UseLocationControllerServiceGetApiMasterLocationByLocationIdKeyFn({ locationId }), queryFn: () => LocationControllerService.getApiMasterLocationByLocationId({ locationId }) });
export const prefetchUseLocationControllerServiceGetApiMasterLocationV2 = (queryClient: QueryClient, { archive, clinicId, page, searchString, size, sortBy, sortDirection, state, status }: {
  archive?: boolean;
  clinicId?: string;
  page?: number;
  searchString?: string;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
  state?: string;
  status?: boolean;
} = {}) => queryClient.prefetchQuery({ queryKey: Common.UseLocationControllerServiceGetApiMasterLocationV2KeyFn({ archive, clinicId, page, searchString, size, sortBy, sortDirection, state, status }), queryFn: () => LocationControllerService.getApiMasterLocationV2({ archive, clinicId, page, searchString, size, sortBy, sortDirection, state, status }) });
export const prefetchUseIntakeFormConsentTemplateServiceGetApiMasterIntakeFormConsentTemplateByUuid = (queryClient: QueryClient, { uuid }: {
  uuid: string;
}) => queryClient.prefetchQuery({ queryKey: Common.UseIntakeFormConsentTemplateServiceGetApiMasterIntakeFormConsentTemplateByUuidKeyFn({ uuid }), queryFn: () => IntakeFormConsentTemplateService.getApiMasterIntakeFormConsentTemplateByUuid({ uuid }) });
export const prefetchUseIntakeFormConsentTemplateServiceGetApiMasterIntakeFormConsentTemplatePatientClinicByPatientClinicUuid = (queryClient: QueryClient, { patientClinicUuid }: {
  patientClinicUuid: string;
}) => queryClient.prefetchQuery({ queryKey: Common.UseIntakeFormConsentTemplateServiceGetApiMasterIntakeFormConsentTemplatePatientClinicByPatientClinicUuidKeyFn({ patientClinicUuid }), queryFn: () => IntakeFormConsentTemplateService.getApiMasterIntakeFormConsentTemplatePatientClinicByPatientClinicUuid({ patientClinicUuid }) });
export const prefetchUseIntakeFormConsentTemplateServiceGetApiMasterIntakeFormConsentTemplatePatientClinicByPatientClinicUuidTypeByFormType = (queryClient: QueryClient, { formType, patientClinicUuid }: {
  formType: "CONSENT_FORM" | "INTAKE_FORM";
  patientClinicUuid: string;
}) => queryClient.prefetchQuery({ queryKey: Common.UseIntakeFormConsentTemplateServiceGetApiMasterIntakeFormConsentTemplatePatientClinicByPatientClinicUuidTypeByFormTypeKeyFn({ formType, patientClinicUuid }), queryFn: () => IntakeFormConsentTemplateService.getApiMasterIntakeFormConsentTemplatePatientClinicByPatientClinicUuidTypeByFormType({ formType, patientClinicUuid }) });
export const prefetchUseIntakeFormConsentTemplateServiceGetApiMasterIntakeFormConsentTemplateAll = (queryClient: QueryClient, { active, formType, page, patientClinicUuid, size, sortBy, sortDirection, templateName }: {
  active?: boolean;
  formType?: "CONSENT_FORM" | "INTAKE_FORM";
  page?: number;
  patientClinicUuid?: string;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
  templateName?: string;
} = {}) => queryClient.prefetchQuery({ queryKey: Common.UseIntakeFormConsentTemplateServiceGetApiMasterIntakeFormConsentTemplateAllKeyFn({ active, formType, page, patientClinicUuid, size, sortBy, sortDirection, templateName }), queryFn: () => IntakeFormConsentTemplateService.getApiMasterIntakeFormConsentTemplateAll({ active, formType, page, patientClinicUuid, size, sortBy, sortDirection, templateName }) });
export const prefetchUseFeeScheduleControllerServiceGetApiMasterFeeSchedule = (queryClient: QueryClient, { active, archive, page, searchString, size }: {
  active?: boolean;
  archive?: boolean;
  page?: number;
  searchString?: string;
  size?: number;
} = {}) => queryClient.prefetchQuery({ queryKey: Common.UseFeeScheduleControllerServiceGetApiMasterFeeScheduleKeyFn({ active, archive, page, searchString, size }), queryFn: () => FeeScheduleControllerService.getApiMasterFeeSchedule({ active, archive, page, searchString, size }) });
export const prefetchUseFeeScheduleControllerServiceGetApiMasterFeeScheduleByFeeScheduleId = (queryClient: QueryClient, { feeScheduleId }: {
  feeScheduleId: string;
}) => queryClient.prefetchQuery({ queryKey: Common.UseFeeScheduleControllerServiceGetApiMasterFeeScheduleByFeeScheduleIdKeyFn({ feeScheduleId }), queryFn: () => FeeScheduleControllerService.getApiMasterFeeScheduleByFeeScheduleId({ feeScheduleId }) });
export const prefetchUseDocumentTypeControllerServiceGetApiMasterDocumentType = (queryClient: QueryClient, { active, archive, clinicUuid, page, searchString, size, sortBy, sortDirection }: {
  active?: boolean;
  archive?: boolean;
  clinicUuid?: string;
  page?: number;
  searchString?: string;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
} = {}) => queryClient.prefetchQuery({ queryKey: Common.UseDocumentTypeControllerServiceGetApiMasterDocumentTypeKeyFn({ active, archive, clinicUuid, page, searchString, size, sortBy, sortDirection }), queryFn: () => DocumentTypeControllerService.getApiMasterDocumentType({ active, archive, clinicUuid, page, searchString, size, sortBy, sortDirection }) });
export const prefetchUseDocumentTypeControllerServiceGetApiMasterDocumentTypeByDocumentTypeId = (queryClient: QueryClient, { documentTypeId }: {
  documentTypeId: string;
}) => queryClient.prefetchQuery({ queryKey: Common.UseDocumentTypeControllerServiceGetApiMasterDocumentTypeByDocumentTypeIdKeyFn({ documentTypeId }), queryFn: () => DocumentTypeControllerService.getApiMasterDocumentTypeByDocumentTypeId({ documentTypeId }) });
export const prefetchUseDocumentTypeControllerServiceGetApiMasterDocumentTypeClinicByClinicUuid = (queryClient: QueryClient, { clinicUuid }: {
  clinicUuid: string;
}) => queryClient.prefetchQuery({ queryKey: Common.UseDocumentTypeControllerServiceGetApiMasterDocumentTypeClinicByClinicUuidKeyFn({ clinicUuid }), queryFn: () => DocumentTypeControllerService.getApiMasterDocumentTypeClinicByClinicUuid({ clinicUuid }) });
export const prefetchUseClinicalTemplateServiceGetApiMasterClinicalTemplate = (queryClient: QueryClient, { active, clinicUuid, page, size, sortBy, sortDirection, templateType, title }: {
  active?: boolean;
  clinicUuid?: string;
  page?: number;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
  templateType?: "ROS" | "PE" | "SOAP_NOTE" | "SIMPLE_NOTE" | "CONSULTATION_NOTE";
  title?: string;
} = {}) => queryClient.prefetchQuery({ queryKey: Common.UseClinicalTemplateServiceGetApiMasterClinicalTemplateKeyFn({ active, clinicUuid, page, size, sortBy, sortDirection, templateType, title }), queryFn: () => ClinicalTemplateService.getApiMasterClinicalTemplate({ active, clinicUuid, page, size, sortBy, sortDirection, templateType, title }) });
export const prefetchUseClinicalTemplateServiceGetApiMasterClinicalTemplateByTemplateId = (queryClient: QueryClient, { templateId }: {
  templateId: string;
}) => queryClient.prefetchQuery({ queryKey: Common.UseClinicalTemplateServiceGetApiMasterClinicalTemplateByTemplateIdKeyFn({ templateId }), queryFn: () => ClinicalTemplateService.getApiMasterClinicalTemplateByTemplateId({ templateId }) });
export const prefetchUseClinicalTemplateServiceGetApiMasterClinicalTemplateClinicByClinicUuid = (queryClient: QueryClient, { clinicUuid }: {
  clinicUuid: string;
}) => queryClient.prefetchQuery({ queryKey: Common.UseClinicalTemplateServiceGetApiMasterClinicalTemplateClinicByClinicUuidKeyFn({ clinicUuid }), queryFn: () => ClinicalTemplateService.getApiMasterClinicalTemplateClinicByClinicUuid({ clinicUuid }) });
export const prefetchUseClinicalTemplateServiceGetApiMasterClinicalTemplateClinicByClinicUuidTypeByTemplateType = (queryClient: QueryClient, { clinicUuid, templateType }: {
  clinicUuid: string;
  templateType: "ROS" | "PE" | "SOAP_NOTE" | "SIMPLE_NOTE" | "CONSULTATION_NOTE";
}) => queryClient.prefetchQuery({ queryKey: Common.UseClinicalTemplateServiceGetApiMasterClinicalTemplateClinicByClinicUuidTypeByTemplateTypeKeyFn({ clinicUuid, templateType }), queryFn: () => ClinicalTemplateService.getApiMasterClinicalTemplateClinicByClinicUuidTypeByTemplateType({ clinicUuid, templateType }) });
export const prefetchUseClinicControllerServiceGetApiMasterClinic = (queryClient: QueryClient, { archive, page, searchString, size, sortBy, sortDirection, state, status }: {
  archive?: boolean;
  page?: number;
  searchString?: string;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
  state?: string;
  status?: boolean;
} = {}) => queryClient.prefetchQuery({ queryKey: Common.UseClinicControllerServiceGetApiMasterClinicKeyFn({ archive, page, searchString, size, sortBy, sortDirection, state, status }), queryFn: () => ClinicControllerService.getApiMasterClinic({ archive, page, searchString, size, sortBy, sortDirection, state, status }) });
export const prefetchUseClinicControllerServiceGetApiMasterClinicByClinicId = (queryClient: QueryClient, { clinicId }: {
  clinicId: string;
}) => queryClient.prefetchQuery({ queryKey: Common.UseClinicControllerServiceGetApiMasterClinicByClinicIdKeyFn({ clinicId }), queryFn: () => ClinicControllerService.getApiMasterClinicByClinicId({ clinicId }) });
export const prefetchUseAppointmentManagementServiceGetApiMasterAppointments = (queryClient: QueryClient, { active, appointmentModes, appointmentStatuses, appointmentTypes, archive, clinicUuid, endDate, locationUuid, page, patientUuid, providerUuid, searchString, size, sortBy, sortDirection, startDate, timeFilter }: {
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
} = {}) => queryClient.prefetchQuery({ queryKey: Common.UseAppointmentManagementServiceGetApiMasterAppointmentsKeyFn({ active, appointmentModes, appointmentStatuses, appointmentTypes, archive, clinicUuid, endDate, locationUuid, page, patientUuid, providerUuid, searchString, size, sortBy, sortDirection, startDate, timeFilter }), queryFn: () => AppointmentManagementService.getApiMasterAppointments({ active, appointmentModes, appointmentStatuses, appointmentTypes, archive, clinicUuid, endDate, locationUuid, page, patientUuid, providerUuid, searchString, size, sortBy, sortDirection, startDate, timeFilter }) });
export const prefetchUseAppointmentManagementServiceGetApiMasterAppointmentsByAppointmentId = (queryClient: QueryClient, { appointmentId }: {
  appointmentId: string;
}) => queryClient.prefetchQuery({ queryKey: Common.UseAppointmentManagementServiceGetApiMasterAppointmentsByAppointmentIdKeyFn({ appointmentId }), queryFn: () => AppointmentManagementService.getApiMasterAppointmentsByAppointmentId({ appointmentId }) });
export const prefetchUseAppointmentManagementServiceGetApiMasterAppointmentsToday = (queryClient: QueryClient) => queryClient.prefetchQuery({ queryKey: Common.UseAppointmentManagementServiceGetApiMasterAppointmentsTodayKeyFn(), queryFn: () => AppointmentManagementService.getApiMasterAppointmentsToday() });
export const prefetchUseAppointmentTypeManagementServiceGetApiMasterAppointmentTypesByUuid = (queryClient: QueryClient, { uuid }: {
  uuid: string;
}) => queryClient.prefetchQuery({ queryKey: Common.UseAppointmentTypeManagementServiceGetApiMasterAppointmentTypesByUuidKeyFn({ uuid }), queryFn: () => AppointmentTypeManagementService.getApiMasterAppointmentTypesByUuid({ uuid }) });
export const prefetchUseAppointmentTypeManagementServiceGetApiMasterAppointmentTypes = (queryClient: QueryClient, { page, size, title }: {
  page?: number;
  size?: number;
  title?: string;
} = {}) => queryClient.prefetchQuery({ queryKey: Common.UseAppointmentTypeManagementServiceGetApiMasterAppointmentTypesKeyFn({ page, size, title }), queryFn: () => AppointmentTypeManagementService.getApiMasterAppointmentTypes({ page, size, title }) });
export const prefetchUseStripeControllerServiceGetApiMasterStripeByClinicId = (queryClient: QueryClient, { clinicId }: {
  clinicId: string;
}) => queryClient.prefetchQuery({ queryKey: Common.UseStripeControllerServiceGetApiMasterStripeByClinicIdKeyFn({ clinicId }), queryFn: () => StripeControllerService.getApiMasterStripeByClinicId({ clinicId }) });
export const prefetchUseStripeControllerServiceGetApiMasterStripePaymentMethodByPatientClinicUuid = (queryClient: QueryClient, { active, archive, page, patientClinicUuid, size, sortBy, sortDirection }: {
  active?: boolean;
  archive?: boolean;
  page?: number;
  patientClinicUuid: string;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
}) => queryClient.prefetchQuery({ queryKey: Common.UseStripeControllerServiceGetApiMasterStripePaymentMethodByPatientClinicUuidKeyFn({ active, archive, page, patientClinicUuid, size, sortBy, sortDirection }), queryFn: () => StripeControllerService.getApiMasterStripePaymentMethodByPatientClinicUuid({ active, archive, page, patientClinicUuid, size, sortBy, sortDirection }) });
export const prefetchUseSpecialityControllerServiceGetApiMasterSpeciality = (queryClient: QueryClient, { page, size, sortBy, sortDirection }: {
  page?: number;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
} = {}) => queryClient.prefetchQuery({ queryKey: Common.UseSpecialityControllerServiceGetApiMasterSpecialityKeyFn({ page, size, sortBy, sortDirection }), queryFn: () => SpecialityControllerService.getApiMasterSpeciality({ page, size, sortBy, sortDirection }) });
export const prefetchUseSpecialityControllerServiceGetApiMasterSpecialityAll = (queryClient: QueryClient) => queryClient.prefetchQuery({ queryKey: Common.UseSpecialityControllerServiceGetApiMasterSpecialityAllKeyFn(), queryFn: () => SpecialityControllerService.getApiMasterSpecialityAll() });
export const prefetchUseRequestAppointmentManagementServiceGetApiMasterRequestAppointmentByUuid = (queryClient: QueryClient, { uuid }: {
  uuid: string;
}) => queryClient.prefetchQuery({ queryKey: Common.UseRequestAppointmentManagementServiceGetApiMasterRequestAppointmentByUuidKeyFn({ uuid }), queryFn: () => RequestAppointmentManagementService.getApiMasterRequestAppointmentByUuid({ uuid }) });
export const prefetchUseRequestAppointmentManagementServiceGetApiMasterRequestAppointmentAll = (queryClient: QueryClient, { active, archive, clinicUuid, page, patientUuid, providerUuid, size, sortBy, sortDirection, status }: {
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
} = {}) => queryClient.prefetchQuery({ queryKey: Common.UseRequestAppointmentManagementServiceGetApiMasterRequestAppointmentAllKeyFn({ active, archive, clinicUuid, page, patientUuid, providerUuid, size, sortBy, sortDirection, status }), queryFn: () => RequestAppointmentManagementService.getApiMasterRequestAppointmentAll({ active, archive, clinicUuid, page, patientUuid, providerUuid, size, sortBy, sortDirection, status }) });
export const prefetchUseAvailabilityManagementServiceGetApiMasterSlots = (queryClient: QueryClient, { appointmentTypeUuid, availabilityMode, clinicUuid, endDate, locationUuid, providerUuid, startDate }: {
  appointmentTypeUuid: string;
  availabilityMode?: "IN_PERSON" | "VIRTUAL" | "HOME";
  clinicUuid?: string;
  endDate?: string;
  locationUuid?: string;
  providerUuid: string;
  startDate?: string;
}) => queryClient.prefetchQuery({ queryKey: Common.UseAvailabilityManagementServiceGetApiMasterSlotsKeyFn({ appointmentTypeUuid, availabilityMode, clinicUuid, endDate, locationUuid, providerUuid, startDate }), queryFn: () => AvailabilityManagementService.getApiMasterSlots({ appointmentTypeUuid, availabilityMode, clinicUuid, endDate, locationUuid, providerUuid, startDate }) });
export const prefetchUseAvailabilityManagementServiceGetApiMasterProviderByProviderUuidAvailabilitySetting = (queryClient: QueryClient, { providerUuid }: {
  providerUuid: string;
}) => queryClient.prefetchQuery({ queryKey: Common.UseAvailabilityManagementServiceGetApiMasterProviderByProviderUuidAvailabilitySettingKeyFn({ providerUuid }), queryFn: () => AvailabilityManagementService.getApiMasterProviderByProviderUuidAvailabilitySetting({ providerUuid }) });
export const prefetchUsePharmacyLabRadiologyControllerServiceGetApiMasterPharmacyLabRadiology = (queryClient: QueryClient, { page, searchString, size, sortBy, sortDirection, type }: {
  page?: number;
  searchString?: string;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
  type?: "LAB" | "PHARMACY" | "RADIOLOGY";
} = {}) => queryClient.prefetchQuery({ queryKey: Common.UsePharmacyLabRadiologyControllerServiceGetApiMasterPharmacyLabRadiologyKeyFn({ page, searchString, size, sortBy, sortDirection, type }), queryFn: () => PharmacyLabRadiologyControllerService.getApiMasterPharmacyLabRadiology({ page, searchString, size, sortBy, sortDirection, type }) });
export const prefetchUsePharmacyLabRadiologyControllerServiceGetApiMasterPharmacyLabRadiologyByPreferenceUuid = (queryClient: QueryClient, { preferenceUuid }: {
  preferenceUuid: string;
}) => queryClient.prefetchQuery({ queryKey: Common.UsePharmacyLabRadiologyControllerServiceGetApiMasterPharmacyLabRadiologyByPreferenceUuidKeyFn({ preferenceUuid }), queryFn: () => PharmacyLabRadiologyControllerService.getApiMasterPharmacyLabRadiologyByPreferenceUuid({ preferenceUuid }) });
export const prefetchUseMigrationControllerServiceGetApiMasterDataImport = (queryClient: QueryClient, { clinicUuid, page, size, sortBy, sortDirection, type }: {
  clinicUuid?: string;
  page?: number;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
  type?: "CPT" | "ICD" | "CUSTOM" | "HCPCS" | "LOINC" | "PAYER_CATALOG" | "PATIENT" | "PROVIDER";
} = {}) => queryClient.prefetchQuery({ queryKey: Common.UseMigrationControllerServiceGetApiMasterDataImportKeyFn({ clinicUuid, page, size, sortBy, sortDirection, type }), queryFn: () => MigrationControllerService.getApiMasterDataImport({ clinicUuid, page, size, sortBy, sortDirection, type }) });
export const prefetchUseMigrationControllerServiceGetApiMasterDataImportSampleByCategory = (queryClient: QueryClient, { category }: {
  category: "CPT" | "ICD" | "CUSTOM" | "HCPCS" | "LOINC" | "PAYER_CATALOG" | "PATIENT" | "PROVIDER";
}) => queryClient.prefetchQuery({ queryKey: Common.UseMigrationControllerServiceGetApiMasterDataImportSampleByCategoryKeyFn({ category }), queryFn: () => MigrationControllerService.getApiMasterDataImportSampleByCategory({ category }) });
export const prefetchUseVideoControllerServiceGetApiMasterVideoTokenByRoom = (queryClient: QueryClient, { authorization, room }: {
  authorization?: string;
  room: string;
}) => queryClient.prefetchQuery({ queryKey: Common.UseVideoControllerServiceGetApiMasterVideoTokenByRoomKeyFn({ authorization, room }), queryFn: () => VideoControllerService.getApiMasterVideoTokenByRoom({ authorization, room }) });
export const prefetchUseVaccinesControllerServiceGetApiMasterVaccine = (queryClient: QueryClient, { page, searchString, size, sortBy, sortDirection }: {
  page?: number;
  searchString?: string;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
} = {}) => queryClient.prefetchQuery({ queryKey: Common.UseVaccinesControllerServiceGetApiMasterVaccineKeyFn({ page, searchString, size, sortBy, sortDirection }), queryFn: () => VaccinesControllerService.getApiMasterVaccine({ page, searchString, size, sortBy, sortDirection }) });
export const prefetchUseLicenseStateControllerServiceGetApiMasterStateList = (queryClient: QueryClient, { page, searchString, size }: {
  page?: number;
  searchString?: string;
  size?: number;
} = {}) => queryClient.prefetchQuery({ queryKey: Common.UseLicenseStateControllerServiceGetApiMasterStateListKeyFn({ page, searchString, size }), queryFn: () => LicenseStateControllerService.getApiMasterStateList({ page, searchString, size }) });
export const prefetchUseInsurancePayerControllerServiceGetApiMasterInsurancePayers = (queryClient: QueryClient, { page, searchString, size, sortBy, sortDirection }: {
  page?: number;
  searchString?: string;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
} = {}) => queryClient.prefetchQuery({ queryKey: Common.UseInsurancePayerControllerServiceGetApiMasterInsurancePayersKeyFn({ page, searchString, size, sortBy, sortDirection }), queryFn: () => InsurancePayerControllerService.getApiMasterInsurancePayers({ page, searchString, size, sortBy, sortDirection }) });
export const prefetchUseAllergyControllerServiceGetApiMasterAllergy = (queryClient: QueryClient, { page, size, sort, sortBy }: {
  page?: number;
  size?: number;
  sort?: string;
  sortBy?: string;
} = {}) => queryClient.prefetchQuery({ queryKey: Common.UseAllergyControllerServiceGetApiMasterAllergyKeyFn({ page, size, sort, sortBy }), queryFn: () => AllergyControllerService.getApiMasterAllergy({ page, size, sort, sortBy }) });
