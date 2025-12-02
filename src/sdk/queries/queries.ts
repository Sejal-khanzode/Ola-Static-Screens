// generated with @7nohe/openapi-react-query-codegen@1.6.2 

import { UseMutationOptions, UseQueryOptions, useMutation, useQuery } from "@tanstack/react-query";
import { AllergyControllerService, AppointmentManagementService, AppointmentTypeManagementService, AuthControllerService, AvailabilityManagementService, ClinicControllerService, ClinicalTemplateService, DocumentTypeControllerService, FeeScheduleControllerService, InsurancePayerControllerService, IntakeFormConsentTemplateService, LicenseStateControllerService, LocationControllerService, MedicalCodeControllerService, MigrationControllerService, PatientAllergyControllerService, PatientClinicControllerService, PatientClinicPaymentMethodControllerService, PatientControllerService, PatientDiagnosisControllerService, PatientDocumentControllerService, PatientFamilyHistoryControllerService, PatientFlagControllerService, PatientInsuranceControllerService, PatientMedicalHistoryControllerService, PatientSurgicalHistoryControllerService, PatientVaccineControllerService, PharmacyLabRadiologyControllerService, PrintConfigurationControllerService, ProviderControllerService, RequestAppointmentManagementService, SpecialityControllerService, StickyNoteControllerService, StripeControllerService, TextMacroControllerService, UserControllerService, VaccinesControllerService, VideoControllerService, VisitNoteTemplateService } from "../requests/services.gen";
import { AddPaymentMethodRequest, AddSignatureRequest, Appointment, AppointmentStatusUpdate, AppointmentType, AvailabilitySetting, ChangeAvatarRequest, ChangePasswordRequest, Clinic, ClinicChargesUpdate, ClinicalTemplate, DocumentType, FeeSchedule, IntakeFormConsentFormTemplate, Location, LoginRequest, LogoutRequest, MedicalCode, OtpVerificationRequest, Patient, PatientAllergy, PatientClinic, PatientDiagnosis, PatientFamilyHistory, PatientFlag, PatientFlagUpdateRequest, PatientInsurance, PatientMedicalHistory, PatientSurgicalHistory, PatientVaccine, PharmacyLabRadiology, PrintConfiguration, Provider, RequestAppointment, RequestAppointmentStatusUpdate, RescheduleAppointmentDTO, ResetPasswordRequest, SetPasswordRequest, Speciality, StickyNotes, TextMacro, User, VisitNoteTemplate } from "../requests/types.gen";
import * as Common from "./common";
export const useUserControllerServiceGetApiMasterUsers = <TData = Common.UserControllerServiceGetApiMasterUsersDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ archive, clinicId, page, searchString, size, sortBy, sortDirection, status }: {
  archive?: boolean;
  clinicId?: string;
  page?: number;
  searchString?: string;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
  status?: boolean;
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseUserControllerServiceGetApiMasterUsersKeyFn({ archive, clinicId, page, searchString, size, sortBy, sortDirection, status }, queryKey), queryFn: () => UserControllerService.getApiMasterUsers({ archive, clinicId, page, searchString, size, sortBy, sortDirection, status }) as TData, ...options });
export const useUserControllerServiceGetApiMasterUserByUserId = <TData = Common.UserControllerServiceGetApiMasterUserByUserIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ userId }: {
  userId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseUserControllerServiceGetApiMasterUserByUserIdKeyFn({ userId }, queryKey), queryFn: () => UserControllerService.getApiMasterUserByUserId({ userId }) as TData, ...options });
export const useUserControllerServiceGetApiMasterProfile = <TData = Common.UserControllerServiceGetApiMasterProfileDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseUserControllerServiceGetApiMasterProfileKeyFn(queryKey), queryFn: () => UserControllerService.getApiMasterProfile() as TData, ...options });
export const useVisitNoteTemplateServiceGetApiMasterVisitNoteTemplate = <TData = Common.VisitNoteTemplateServiceGetApiMasterVisitNoteTemplateDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ active, clinicUuid, page, size, sortBy, sortDirection, templateName, templateType }: {
  active?: boolean;
  clinicUuid?: string;
  page?: number;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
  templateName?: string;
  templateType?: "ROS" | "PE" | "SOAP_NOTE" | "SIMPLE_NOTE" | "CONSULTATION_NOTE";
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseVisitNoteTemplateServiceGetApiMasterVisitNoteTemplateKeyFn({ active, clinicUuid, page, size, sortBy, sortDirection, templateName, templateType }, queryKey), queryFn: () => VisitNoteTemplateService.getApiMasterVisitNoteTemplate({ active, clinicUuid, page, size, sortBy, sortDirection, templateName, templateType }) as TData, ...options });
export const useVisitNoteTemplateServiceGetApiMasterVisitNoteTemplateByTemplateId = <TData = Common.VisitNoteTemplateServiceGetApiMasterVisitNoteTemplateByTemplateIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ templateId }: {
  templateId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseVisitNoteTemplateServiceGetApiMasterVisitNoteTemplateByTemplateIdKeyFn({ templateId }, queryKey), queryFn: () => VisitNoteTemplateService.getApiMasterVisitNoteTemplateByTemplateId({ templateId }) as TData, ...options });
export const useVisitNoteTemplateServiceGetApiMasterVisitNoteTemplateClinicByClinicUuid = <TData = Common.VisitNoteTemplateServiceGetApiMasterVisitNoteTemplateClinicByClinicUuidDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ clinicUuid }: {
  clinicUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseVisitNoteTemplateServiceGetApiMasterVisitNoteTemplateClinicByClinicUuidKeyFn({ clinicUuid }, queryKey), queryFn: () => VisitNoteTemplateService.getApiMasterVisitNoteTemplateClinicByClinicUuid({ clinicUuid }) as TData, ...options });
export const useVisitNoteTemplateServiceGetApiMasterVisitNoteTemplateClinicByClinicUuidTypeByTemplateType = <TData = Common.VisitNoteTemplateServiceGetApiMasterVisitNoteTemplateClinicByClinicUuidTypeByTemplateTypeDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ clinicUuid, templateType }: {
  clinicUuid: string;
  templateType: "ROS" | "PE" | "SOAP_NOTE" | "SIMPLE_NOTE" | "CONSULTATION_NOTE";
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseVisitNoteTemplateServiceGetApiMasterVisitNoteTemplateClinicByClinicUuidTypeByTemplateTypeKeyFn({ clinicUuid, templateType }, queryKey), queryFn: () => VisitNoteTemplateService.getApiMasterVisitNoteTemplateClinicByClinicUuidTypeByTemplateType({ clinicUuid, templateType }) as TData, ...options });
export const useTextMacroControllerServiceGetApiMasterTextMacro = <TData = Common.TextMacroControllerServiceGetApiMasterTextMacroDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ clinicUuid, page, size, sortBy, sortDirection, title }: {
  clinicUuid?: string;
  page?: number;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
  title?: string;
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseTextMacroControllerServiceGetApiMasterTextMacroKeyFn({ clinicUuid, page, size, sortBy, sortDirection, title }, queryKey), queryFn: () => TextMacroControllerService.getApiMasterTextMacro({ clinicUuid, page, size, sortBy, sortDirection, title }) as TData, ...options });
export const useTextMacroControllerServiceGetApiMasterTextMacroByTextMacroId = <TData = Common.TextMacroControllerServiceGetApiMasterTextMacroByTextMacroIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ textMacroId }: {
  textMacroId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseTextMacroControllerServiceGetApiMasterTextMacroByTextMacroIdKeyFn({ textMacroId }, queryKey), queryFn: () => TextMacroControllerService.getApiMasterTextMacroByTextMacroId({ textMacroId }) as TData, ...options });
export const useStickyNoteControllerServiceGetApiMasterStickyNotes = <TData = Common.StickyNoteControllerServiceGetApiMasterStickyNotesDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ archive, page, patientClinicUuid, size, sort, sortBy, status }: {
  archive?: boolean;
  page?: number;
  patientClinicUuid: string;
  size?: number;
  sort?: string;
  sortBy?: string;
  status?: boolean;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseStickyNoteControllerServiceGetApiMasterStickyNotesKeyFn({ archive, page, patientClinicUuid, size, sort, sortBy, status }, queryKey), queryFn: () => StickyNoteControllerService.getApiMasterStickyNotes({ archive, page, patientClinicUuid, size, sort, sortBy, status }) as TData, ...options });
export const useStickyNoteControllerServiceGetApiMasterStickyNotesByStickyNoteId = <TData = Common.StickyNoteControllerServiceGetApiMasterStickyNotesByStickyNoteIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ stickyNoteId }: {
  stickyNoteId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseStickyNoteControllerServiceGetApiMasterStickyNotesByStickyNoteIdKeyFn({ stickyNoteId }, queryKey), queryFn: () => StickyNoteControllerService.getApiMasterStickyNotesByStickyNoteId({ stickyNoteId }) as TData, ...options });
export const useProviderControllerServiceGetApiMasterProvider = <TData = Common.ProviderControllerServiceGetApiMasterProviderDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ archive, clinicId, page, searchString, size, sortBy, sortDirection, status }: {
  archive?: boolean;
  clinicId?: string;
  page?: number;
  searchString?: string;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
  status?: boolean;
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseProviderControllerServiceGetApiMasterProviderKeyFn({ archive, clinicId, page, searchString, size, sortBy, sortDirection, status }, queryKey), queryFn: () => ProviderControllerService.getApiMasterProvider({ archive, clinicId, page, searchString, size, sortBy, sortDirection, status }) as TData, ...options });
export const useProviderControllerServiceGetApiMasterProviderByProviderId = <TData = Common.ProviderControllerServiceGetApiMasterProviderByProviderIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ providerId }: {
  providerId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseProviderControllerServiceGetApiMasterProviderByProviderIdKeyFn({ providerId }, queryKey), queryFn: () => ProviderControllerService.getApiMasterProviderByProviderId({ providerId }) as TData, ...options });
export const useProviderControllerServiceGetApiMasterProviderByProviderIdClinics = <TData = Common.ProviderControllerServiceGetApiMasterProviderByProviderIdClinicsDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ active, archive, isProvider, providerId }: {
  active?: boolean;
  archive?: boolean;
  isProvider?: boolean;
  providerId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseProviderControllerServiceGetApiMasterProviderByProviderIdClinicsKeyFn({ active, archive, isProvider, providerId }, queryKey), queryFn: () => ProviderControllerService.getApiMasterProviderByProviderIdClinics({ active, archive, isProvider, providerId }) as TData, ...options });
export const useProviderControllerServiceGetApiMasterProviderUserByUserUuid = <TData = Common.ProviderControllerServiceGetApiMasterProviderUserByUserUuidDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ userUuid }: {
  userUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseProviderControllerServiceGetApiMasterProviderUserByUserUuidKeyFn({ userUuid }, queryKey), queryFn: () => ProviderControllerService.getApiMasterProviderUserByUserUuid({ userUuid }) as TData, ...options });
export const useProviderControllerServiceGetApiMasterProviderProfile = <TData = Common.ProviderControllerServiceGetApiMasterProviderProfileDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseProviderControllerServiceGetApiMasterProviderProfileKeyFn(queryKey), queryFn: () => ProviderControllerService.getApiMasterProviderProfile() as TData, ...options });
export const useProviderControllerServiceGetApiMasterProviderCounts = <TData = Common.ProviderControllerServiceGetApiMasterProviderCountsDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseProviderControllerServiceGetApiMasterProviderCountsKeyFn(queryKey), queryFn: () => ProviderControllerService.getApiMasterProviderCounts() as TData, ...options });
export const usePrintConfigurationControllerServiceGetApiMasterPrintConfigurationClinicByClinicUuid = <TData = Common.PrintConfigurationControllerServiceGetApiMasterPrintConfigurationClinicByClinicUuidDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ clinicUuid }: {
  clinicUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UsePrintConfigurationControllerServiceGetApiMasterPrintConfigurationClinicByClinicUuidKeyFn({ clinicUuid }, queryKey), queryFn: () => PrintConfigurationControllerService.getApiMasterPrintConfigurationClinicByClinicUuid({ clinicUuid }) as TData, ...options });
export const usePatientControllerServiceGetApiMasterPatient = <TData = Common.PatientControllerServiceGetApiMasterPatientDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ archive, page, searchString, size, sortBy, sortDirection, status }: {
  archive?: boolean;
  page?: number;
  searchString?: string;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
  status?: boolean;
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UsePatientControllerServiceGetApiMasterPatientKeyFn({ archive, page, searchString, size, sortBy, sortDirection, status }, queryKey), queryFn: () => PatientControllerService.getApiMasterPatient({ archive, page, searchString, size, sortBy, sortDirection, status }) as TData, ...options });
export const usePatientControllerServiceGetApiMasterPatientByPatientId = <TData = Common.PatientControllerServiceGetApiMasterPatientByPatientIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ patientId }: {
  patientId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UsePatientControllerServiceGetApiMasterPatientByPatientIdKeyFn({ patientId }, queryKey), queryFn: () => PatientControllerService.getApiMasterPatientByPatientId({ patientId }) as TData, ...options });
export const usePatientControllerServiceGetApiMasterPatientByPatientIdSignature = <TData = Common.PatientControllerServiceGetApiMasterPatientByPatientIdSignatureDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ patientId }: {
  patientId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UsePatientControllerServiceGetApiMasterPatientByPatientIdSignatureKeyFn({ patientId }, queryKey), queryFn: () => PatientControllerService.getApiMasterPatientByPatientIdSignature({ patientId }) as TData, ...options });
export const usePatientControllerServiceGetApiMasterPatientProfile = <TData = Common.PatientControllerServiceGetApiMasterPatientProfileDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UsePatientControllerServiceGetApiMasterPatientProfileKeyFn(queryKey), queryFn: () => PatientControllerService.getApiMasterPatientProfile() as TData, ...options });
export const usePatientVaccineControllerServiceGetApiMasterPatientVaccine = <TData = Common.PatientVaccineControllerServiceGetApiMasterPatientVaccineDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ archive, page, patientClinicUuid, searchString, size, sort, sortBy, status }: {
  archive?: boolean;
  page?: number;
  patientClinicUuid: string;
  searchString?: string;
  size?: number;
  sort?: string;
  sortBy?: string;
  status?: boolean;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UsePatientVaccineControllerServiceGetApiMasterPatientVaccineKeyFn({ archive, page, patientClinicUuid, searchString, size, sort, sortBy, status }, queryKey), queryFn: () => PatientVaccineControllerService.getApiMasterPatientVaccine({ archive, page, patientClinicUuid, searchString, size, sort, sortBy, status }) as TData, ...options });
export const usePatientVaccineControllerServiceGetApiMasterPatientVaccineByPatientVaccineId = <TData = Common.PatientVaccineControllerServiceGetApiMasterPatientVaccineByPatientVaccineIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ patientVaccineId }: {
  patientVaccineId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UsePatientVaccineControllerServiceGetApiMasterPatientVaccineByPatientVaccineIdKeyFn({ patientVaccineId }, queryKey), queryFn: () => PatientVaccineControllerService.getApiMasterPatientVaccineByPatientVaccineId({ patientVaccineId }) as TData, ...options });
export const usePatientSurgicalHistoryControllerServiceGetApiMasterPatientSurgicalHistory = <TData = Common.PatientSurgicalHistoryControllerServiceGetApiMasterPatientSurgicalHistoryDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ archive, page, patientClinicUuid, searchString, size, sort, sortBy, status }: {
  archive?: boolean;
  page?: number;
  patientClinicUuid: string;
  searchString?: string;
  size?: number;
  sort?: string;
  sortBy?: string;
  status?: boolean;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UsePatientSurgicalHistoryControllerServiceGetApiMasterPatientSurgicalHistoryKeyFn({ archive, page, patientClinicUuid, searchString, size, sort, sortBy, status }, queryKey), queryFn: () => PatientSurgicalHistoryControllerService.getApiMasterPatientSurgicalHistory({ archive, page, patientClinicUuid, searchString, size, sort, sortBy, status }) as TData, ...options });
export const usePatientSurgicalHistoryControllerServiceGetApiMasterPatientSurgicalHistoryByPatientSurgicalHistoryId = <TData = Common.PatientSurgicalHistoryControllerServiceGetApiMasterPatientSurgicalHistoryByPatientSurgicalHistoryIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ patientSurgicalHistoryId }: {
  patientSurgicalHistoryId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UsePatientSurgicalHistoryControllerServiceGetApiMasterPatientSurgicalHistoryByPatientSurgicalHistoryIdKeyFn({ patientSurgicalHistoryId }, queryKey), queryFn: () => PatientSurgicalHistoryControllerService.getApiMasterPatientSurgicalHistoryByPatientSurgicalHistoryId({ patientSurgicalHistoryId }) as TData, ...options });
export const usePatientMedicalHistoryControllerServiceGetApiMasterPatientMedicalHistory = <TData = Common.PatientMedicalHistoryControllerServiceGetApiMasterPatientMedicalHistoryDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ archive, page, patientClinicUuid, searchString, size, sort, sortBy, status }: {
  archive?: boolean;
  page?: number;
  patientClinicUuid: string;
  searchString?: string;
  size?: number;
  sort?: string;
  sortBy?: string;
  status?: boolean;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UsePatientMedicalHistoryControllerServiceGetApiMasterPatientMedicalHistoryKeyFn({ archive, page, patientClinicUuid, searchString, size, sort, sortBy, status }, queryKey), queryFn: () => PatientMedicalHistoryControllerService.getApiMasterPatientMedicalHistory({ archive, page, patientClinicUuid, searchString, size, sort, sortBy, status }) as TData, ...options });
export const usePatientMedicalHistoryControllerServiceGetApiMasterPatientMedicalHistoryByPatientMedicalHistoryId = <TData = Common.PatientMedicalHistoryControllerServiceGetApiMasterPatientMedicalHistoryByPatientMedicalHistoryIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ patientMedicalHistoryId }: {
  patientMedicalHistoryId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UsePatientMedicalHistoryControllerServiceGetApiMasterPatientMedicalHistoryByPatientMedicalHistoryIdKeyFn({ patientMedicalHistoryId }, queryKey), queryFn: () => PatientMedicalHistoryControllerService.getApiMasterPatientMedicalHistoryByPatientMedicalHistoryId({ patientMedicalHistoryId }) as TData, ...options });
export const usePatientInsuranceControllerServiceGetApiMasterPatientInsurance = <TData = Common.PatientInsuranceControllerServiceGetApiMasterPatientInsuranceDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ active, archive, clinicUuid, insuranceType, page, patientClinicUuid, searchString, size, sortBy, sortDirection }: {
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
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UsePatientInsuranceControllerServiceGetApiMasterPatientInsuranceKeyFn({ active, archive, clinicUuid, insuranceType, page, patientClinicUuid, searchString, size, sortBy, sortDirection }, queryKey), queryFn: () => PatientInsuranceControllerService.getApiMasterPatientInsurance({ active, archive, clinicUuid, insuranceType, page, patientClinicUuid, searchString, size, sortBy, sortDirection }) as TData, ...options });
export const usePatientInsuranceControllerServiceGetApiMasterPatientInsuranceByPatientInsuranceId = <TData = Common.PatientInsuranceControllerServiceGetApiMasterPatientInsuranceByPatientInsuranceIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ patientInsuranceId }: {
  patientInsuranceId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UsePatientInsuranceControllerServiceGetApiMasterPatientInsuranceByPatientInsuranceIdKeyFn({ patientInsuranceId }, queryKey), queryFn: () => PatientInsuranceControllerService.getApiMasterPatientInsuranceByPatientInsuranceId({ patientInsuranceId }) as TData, ...options });
export const usePatientInsuranceControllerServiceGetApiMasterPatientInsurancePatientClinicByPatientClinicUuid = <TData = Common.PatientInsuranceControllerServiceGetApiMasterPatientInsurancePatientClinicByPatientClinicUuidDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ active, archive, patientClinicUuid }: {
  active?: boolean;
  archive?: boolean;
  patientClinicUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UsePatientInsuranceControllerServiceGetApiMasterPatientInsurancePatientClinicByPatientClinicUuidKeyFn({ active, archive, patientClinicUuid }, queryKey), queryFn: () => PatientInsuranceControllerService.getApiMasterPatientInsurancePatientClinicByPatientClinicUuid({ active, archive, patientClinicUuid }) as TData, ...options });
export const usePatientFlagControllerServiceGetApiMasterPatientFlag = <TData = Common.PatientFlagControllerServiceGetApiMasterPatientFlagDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ archive, clinicUuid, page, searchString, size, sortBy, sortDirection, status }: {
  archive?: boolean;
  clinicUuid?: string;
  page?: number;
  searchString?: string;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
  status?: boolean;
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UsePatientFlagControllerServiceGetApiMasterPatientFlagKeyFn({ archive, clinicUuid, page, searchString, size, sortBy, sortDirection, status }, queryKey), queryFn: () => PatientFlagControllerService.getApiMasterPatientFlag({ archive, clinicUuid, page, searchString, size, sortBy, sortDirection, status }) as TData, ...options });
export const usePatientFlagControllerServiceGetApiMasterPatientFlagByPatientFlagId = <TData = Common.PatientFlagControllerServiceGetApiMasterPatientFlagByPatientFlagIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ patientFlagId }: {
  patientFlagId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UsePatientFlagControllerServiceGetApiMasterPatientFlagByPatientFlagIdKeyFn({ patientFlagId }, queryKey), queryFn: () => PatientFlagControllerService.getApiMasterPatientFlagByPatientFlagId({ patientFlagId }) as TData, ...options });
export const usePatientFlagControllerServiceGetApiMasterPatientFlagPatientClinicByPatientClinicUuid = <TData = Common.PatientFlagControllerServiceGetApiMasterPatientFlagPatientClinicByPatientClinicUuidDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ patientClinicUuid }: {
  patientClinicUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UsePatientFlagControllerServiceGetApiMasterPatientFlagPatientClinicByPatientClinicUuidKeyFn({ patientClinicUuid }, queryKey), queryFn: () => PatientFlagControllerService.getApiMasterPatientFlagPatientClinicByPatientClinicUuid({ patientClinicUuid }) as TData, ...options });
export const usePatientFlagControllerServiceGetApiMasterPatientFlagClinicByClinicId = <TData = Common.PatientFlagControllerServiceGetApiMasterPatientFlagClinicByClinicIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UsePatientFlagControllerServiceGetApiMasterPatientFlagClinicByClinicIdKeyFn(queryKey), queryFn: () => PatientFlagControllerService.getApiMasterPatientFlagClinicByClinicId() as TData, ...options });
export const usePatientFlagControllerServiceGetApiMasterPatientFlagActive = <TData = Common.PatientFlagControllerServiceGetApiMasterPatientFlagActiveDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UsePatientFlagControllerServiceGetApiMasterPatientFlagActiveKeyFn(queryKey), queryFn: () => PatientFlagControllerService.getApiMasterPatientFlagActive() as TData, ...options });
export const usePatientFamilyHistoryControllerServiceGetApiMasterPatientFamilyHistory = <TData = Common.PatientFamilyHistoryControllerServiceGetApiMasterPatientFamilyHistoryDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ archive, page, patientClinicUuid, searchString, size, sort, sortBy, status }: {
  archive?: boolean;
  page?: number;
  patientClinicUuid: string;
  searchString?: string;
  size?: number;
  sort?: string;
  sortBy?: string;
  status?: boolean;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UsePatientFamilyHistoryControllerServiceGetApiMasterPatientFamilyHistoryKeyFn({ archive, page, patientClinicUuid, searchString, size, sort, sortBy, status }, queryKey), queryFn: () => PatientFamilyHistoryControllerService.getApiMasterPatientFamilyHistory({ archive, page, patientClinicUuid, searchString, size, sort, sortBy, status }) as TData, ...options });
export const usePatientFamilyHistoryControllerServiceGetApiMasterPatientFamilyHistoryByPatientFamilyHistoryId = <TData = Common.PatientFamilyHistoryControllerServiceGetApiMasterPatientFamilyHistoryByPatientFamilyHistoryIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ patientFamilyHistoryId }: {
  patientFamilyHistoryId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UsePatientFamilyHistoryControllerServiceGetApiMasterPatientFamilyHistoryByPatientFamilyHistoryIdKeyFn({ patientFamilyHistoryId }, queryKey), queryFn: () => PatientFamilyHistoryControllerService.getApiMasterPatientFamilyHistoryByPatientFamilyHistoryId({ patientFamilyHistoryId }) as TData, ...options });
export const usePatientDocumentControllerServiceGetApiMasterPatientDocumentByPatientDocumentId = <TData = Common.PatientDocumentControllerServiceGetApiMasterPatientDocumentByPatientDocumentIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ patientDocumentId }: {
  patientDocumentId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UsePatientDocumentControllerServiceGetApiMasterPatientDocumentByPatientDocumentIdKeyFn({ patientDocumentId }, queryKey), queryFn: () => PatientDocumentControllerService.getApiMasterPatientDocumentByPatientDocumentId({ patientDocumentId }) as TData, ...options });
export const usePatientDocumentControllerServiceGetApiMasterPatientDocumentList = <TData = Common.PatientDocumentControllerServiceGetApiMasterPatientDocumentListDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ archive, assigned, page, patientId, size, sortBy, sortDirection, status }: {
  archive?: boolean;
  assigned?: boolean;
  page?: number;
  patientId?: string;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
  status?: boolean;
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UsePatientDocumentControllerServiceGetApiMasterPatientDocumentListKeyFn({ archive, assigned, page, patientId, size, sortBy, sortDirection, status }, queryKey), queryFn: () => PatientDocumentControllerService.getApiMasterPatientDocumentList({ archive, assigned, page, patientId, size, sortBy, sortDirection, status }) as TData, ...options });
export const usePatientDiagnosisControllerServiceGetApiMasterPatientDiagnosis = <TData = Common.PatientDiagnosisControllerServiceGetApiMasterPatientDiagnosisDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ archive, page, patientClinicUuid, searchString, size, sortBy, sortDirection, status }: {
  archive?: boolean;
  page?: number;
  patientClinicUuid: string;
  searchString?: string;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
  status?: boolean;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UsePatientDiagnosisControllerServiceGetApiMasterPatientDiagnosisKeyFn({ archive, page, patientClinicUuid, searchString, size, sortBy, sortDirection, status }, queryKey), queryFn: () => PatientDiagnosisControllerService.getApiMasterPatientDiagnosis({ archive, page, patientClinicUuid, searchString, size, sortBy, sortDirection, status }) as TData, ...options });
export const usePatientDiagnosisControllerServiceGetApiMasterPatientDiagnosisByPatientDiagnosisId = <TData = Common.PatientDiagnosisControllerServiceGetApiMasterPatientDiagnosisByPatientDiagnosisIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ patientDiagnosisId }: {
  patientDiagnosisId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UsePatientDiagnosisControllerServiceGetApiMasterPatientDiagnosisByPatientDiagnosisIdKeyFn({ patientDiagnosisId }, queryKey), queryFn: () => PatientDiagnosisControllerService.getApiMasterPatientDiagnosisByPatientDiagnosisId({ patientDiagnosisId }) as TData, ...options });
export const usePatientClinicControllerServiceGetApiMasterPatientClinic = <TData = Common.PatientClinicControllerServiceGetApiMasterPatientClinicDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ active, archive, clinicUuid, page, patientUuid, primaryProviderUuid, searchString, size, sortBy, sortDirection }: {
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
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UsePatientClinicControllerServiceGetApiMasterPatientClinicKeyFn({ active, archive, clinicUuid, page, patientUuid, primaryProviderUuid, searchString, size, sortBy, sortDirection }, queryKey), queryFn: () => PatientClinicControllerService.getApiMasterPatientClinic({ active, archive, clinicUuid, page, patientUuid, primaryProviderUuid, searchString, size, sortBy, sortDirection }) as TData, ...options });
export const usePatientClinicControllerServiceGetApiMasterPatientClinicByPatientClinicUuid = <TData = Common.PatientClinicControllerServiceGetApiMasterPatientClinicByPatientClinicUuidDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ patientClinicUuid }: {
  patientClinicUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UsePatientClinicControllerServiceGetApiMasterPatientClinicByPatientClinicUuidKeyFn({ patientClinicUuid }, queryKey), queryFn: () => PatientClinicControllerService.getApiMasterPatientClinicByPatientClinicUuid({ patientClinicUuid }) as TData, ...options });
export const usePatientClinicControllerServiceGetApiMasterPatientClinicPatientByPatientUuid = <TData = Common.PatientClinicControllerServiceGetApiMasterPatientClinicPatientByPatientUuidDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ patientUuid }: {
  patientUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UsePatientClinicControllerServiceGetApiMasterPatientClinicPatientByPatientUuidKeyFn({ patientUuid }, queryKey), queryFn: () => PatientClinicControllerService.getApiMasterPatientClinicPatientByPatientUuid({ patientUuid }) as TData, ...options });
export const usePatientAllergyControllerServiceGetApiMasterPatientAllergy = <TData = Common.PatientAllergyControllerServiceGetApiMasterPatientAllergyDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ archive, page, patientClinicUuid, searchString, size, sort, sortBy, status }: {
  archive?: boolean;
  page?: number;
  patientClinicUuid: string;
  searchString?: string;
  size?: number;
  sort?: string;
  sortBy?: string;
  status?: boolean;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UsePatientAllergyControllerServiceGetApiMasterPatientAllergyKeyFn({ archive, page, patientClinicUuid, searchString, size, sort, sortBy, status }, queryKey), queryFn: () => PatientAllergyControllerService.getApiMasterPatientAllergy({ archive, page, patientClinicUuid, searchString, size, sort, sortBy, status }) as TData, ...options });
export const usePatientAllergyControllerServiceGetApiMasterPatientAllergyByPatientAllergyId = <TData = Common.PatientAllergyControllerServiceGetApiMasterPatientAllergyByPatientAllergyIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ patientAllergyId }: {
  patientAllergyId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UsePatientAllergyControllerServiceGetApiMasterPatientAllergyByPatientAllergyIdKeyFn({ patientAllergyId }, queryKey), queryFn: () => PatientAllergyControllerService.getApiMasterPatientAllergyByPatientAllergyId({ patientAllergyId }) as TData, ...options });
export const useMedicalCodeControllerServiceGetApiMasterMedicalCodes = <TData = Common.MedicalCodeControllerServiceGetApiMasterMedicalCodesDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ active, archive, page, searchString, size, sort, sortBy, type }: {
  active?: boolean;
  archive?: boolean;
  page?: number;
  searchString?: string;
  size?: number;
  sort?: string;
  sortBy?: string;
  type?: "CPT" | "ICD" | "CUSTOM" | "HCPCS" | "LOINC" | "PAYER_CATALOG" | "PATIENT" | "PROVIDER";
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseMedicalCodeControllerServiceGetApiMasterMedicalCodesKeyFn({ active, archive, page, searchString, size, sort, sortBy, type }, queryKey), queryFn: () => MedicalCodeControllerService.getApiMasterMedicalCodes({ active, archive, page, searchString, size, sort, sortBy, type }) as TData, ...options });
export const useMedicalCodeControllerServiceGetApiMasterMedicalCodesByMedicalCodeId = <TData = Common.MedicalCodeControllerServiceGetApiMasterMedicalCodesByMedicalCodeIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ medicalCodeId }: {
  medicalCodeId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseMedicalCodeControllerServiceGetApiMasterMedicalCodesByMedicalCodeIdKeyFn({ medicalCodeId }, queryKey), queryFn: () => MedicalCodeControllerService.getApiMasterMedicalCodesByMedicalCodeId({ medicalCodeId }) as TData, ...options });
export const useLocationControllerServiceGetApiMasterLocation = <TData = Common.LocationControllerServiceGetApiMasterLocationDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ archive, clinicId, page, searchString, size, sortBy, sortDirection, state, status }: {
  archive?: boolean;
  clinicId?: string;
  page?: number;
  searchString?: string;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
  state?: string;
  status?: boolean;
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseLocationControllerServiceGetApiMasterLocationKeyFn({ archive, clinicId, page, searchString, size, sortBy, sortDirection, state, status }, queryKey), queryFn: () => LocationControllerService.getApiMasterLocation({ archive, clinicId, page, searchString, size, sortBy, sortDirection, state, status }) as TData, ...options });
export const useLocationControllerServiceGetApiMasterLocationByLocationId = <TData = Common.LocationControllerServiceGetApiMasterLocationByLocationIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ locationId }: {
  locationId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseLocationControllerServiceGetApiMasterLocationByLocationIdKeyFn({ locationId }, queryKey), queryFn: () => LocationControllerService.getApiMasterLocationByLocationId({ locationId }) as TData, ...options });
export const useLocationControllerServiceGetApiMasterLocationV2 = <TData = Common.LocationControllerServiceGetApiMasterLocationV2DefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ archive, clinicId, page, searchString, size, sortBy, sortDirection, state, status }: {
  archive?: boolean;
  clinicId?: string;
  page?: number;
  searchString?: string;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
  state?: string;
  status?: boolean;
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseLocationControllerServiceGetApiMasterLocationV2KeyFn({ archive, clinicId, page, searchString, size, sortBy, sortDirection, state, status }, queryKey), queryFn: () => LocationControllerService.getApiMasterLocationV2({ archive, clinicId, page, searchString, size, sortBy, sortDirection, state, status }) as TData, ...options });
export const useIntakeFormConsentTemplateServiceGetApiMasterIntakeFormConsentTemplateByUuid = <TData = Common.IntakeFormConsentTemplateServiceGetApiMasterIntakeFormConsentTemplateByUuidDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ uuid }: {
  uuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseIntakeFormConsentTemplateServiceGetApiMasterIntakeFormConsentTemplateByUuidKeyFn({ uuid }, queryKey), queryFn: () => IntakeFormConsentTemplateService.getApiMasterIntakeFormConsentTemplateByUuid({ uuid }) as TData, ...options });
export const useIntakeFormConsentTemplateServiceGetApiMasterIntakeFormConsentTemplatePatientClinicByPatientClinicUuid = <TData = Common.IntakeFormConsentTemplateServiceGetApiMasterIntakeFormConsentTemplatePatientClinicByPatientClinicUuidDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ patientClinicUuid }: {
  patientClinicUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseIntakeFormConsentTemplateServiceGetApiMasterIntakeFormConsentTemplatePatientClinicByPatientClinicUuidKeyFn({ patientClinicUuid }, queryKey), queryFn: () => IntakeFormConsentTemplateService.getApiMasterIntakeFormConsentTemplatePatientClinicByPatientClinicUuid({ patientClinicUuid }) as TData, ...options });
export const useIntakeFormConsentTemplateServiceGetApiMasterIntakeFormConsentTemplatePatientClinicByPatientClinicUuidTypeByFormType = <TData = Common.IntakeFormConsentTemplateServiceGetApiMasterIntakeFormConsentTemplatePatientClinicByPatientClinicUuidTypeByFormTypeDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ formType, patientClinicUuid }: {
  formType: "CONSENT_FORM" | "INTAKE_FORM";
  patientClinicUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseIntakeFormConsentTemplateServiceGetApiMasterIntakeFormConsentTemplatePatientClinicByPatientClinicUuidTypeByFormTypeKeyFn({ formType, patientClinicUuid }, queryKey), queryFn: () => IntakeFormConsentTemplateService.getApiMasterIntakeFormConsentTemplatePatientClinicByPatientClinicUuidTypeByFormType({ formType, patientClinicUuid }) as TData, ...options });
export const useIntakeFormConsentTemplateServiceGetApiMasterIntakeFormConsentTemplateAll = <TData = Common.IntakeFormConsentTemplateServiceGetApiMasterIntakeFormConsentTemplateAllDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ active, formType, page, patientClinicUuid, size, sortBy, sortDirection, templateName }: {
  active?: boolean;
  formType?: "CONSENT_FORM" | "INTAKE_FORM";
  page?: number;
  patientClinicUuid?: string;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
  templateName?: string;
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseIntakeFormConsentTemplateServiceGetApiMasterIntakeFormConsentTemplateAllKeyFn({ active, formType, page, patientClinicUuid, size, sortBy, sortDirection, templateName }, queryKey), queryFn: () => IntakeFormConsentTemplateService.getApiMasterIntakeFormConsentTemplateAll({ active, formType, page, patientClinicUuid, size, sortBy, sortDirection, templateName }) as TData, ...options });
export const useFeeScheduleControllerServiceGetApiMasterFeeSchedule = <TData = Common.FeeScheduleControllerServiceGetApiMasterFeeScheduleDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ active, archive, page, searchString, size }: {
  active?: boolean;
  archive?: boolean;
  page?: number;
  searchString?: string;
  size?: number;
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseFeeScheduleControllerServiceGetApiMasterFeeScheduleKeyFn({ active, archive, page, searchString, size }, queryKey), queryFn: () => FeeScheduleControllerService.getApiMasterFeeSchedule({ active, archive, page, searchString, size }) as TData, ...options });
export const useFeeScheduleControllerServiceGetApiMasterFeeScheduleByFeeScheduleId = <TData = Common.FeeScheduleControllerServiceGetApiMasterFeeScheduleByFeeScheduleIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ feeScheduleId }: {
  feeScheduleId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseFeeScheduleControllerServiceGetApiMasterFeeScheduleByFeeScheduleIdKeyFn({ feeScheduleId }, queryKey), queryFn: () => FeeScheduleControllerService.getApiMasterFeeScheduleByFeeScheduleId({ feeScheduleId }) as TData, ...options });
export const useDocumentTypeControllerServiceGetApiMasterDocumentType = <TData = Common.DocumentTypeControllerServiceGetApiMasterDocumentTypeDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ active, archive, clinicUuid, page, searchString, size, sortBy, sortDirection }: {
  active?: boolean;
  archive?: boolean;
  clinicUuid?: string;
  page?: number;
  searchString?: string;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseDocumentTypeControllerServiceGetApiMasterDocumentTypeKeyFn({ active, archive, clinicUuid, page, searchString, size, sortBy, sortDirection }, queryKey), queryFn: () => DocumentTypeControllerService.getApiMasterDocumentType({ active, archive, clinicUuid, page, searchString, size, sortBy, sortDirection }) as TData, ...options });
export const useDocumentTypeControllerServiceGetApiMasterDocumentTypeByDocumentTypeId = <TData = Common.DocumentTypeControllerServiceGetApiMasterDocumentTypeByDocumentTypeIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ documentTypeId }: {
  documentTypeId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseDocumentTypeControllerServiceGetApiMasterDocumentTypeByDocumentTypeIdKeyFn({ documentTypeId }, queryKey), queryFn: () => DocumentTypeControllerService.getApiMasterDocumentTypeByDocumentTypeId({ documentTypeId }) as TData, ...options });
export const useDocumentTypeControllerServiceGetApiMasterDocumentTypeClinicByClinicUuid = <TData = Common.DocumentTypeControllerServiceGetApiMasterDocumentTypeClinicByClinicUuidDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ clinicUuid }: {
  clinicUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseDocumentTypeControllerServiceGetApiMasterDocumentTypeClinicByClinicUuidKeyFn({ clinicUuid }, queryKey), queryFn: () => DocumentTypeControllerService.getApiMasterDocumentTypeClinicByClinicUuid({ clinicUuid }) as TData, ...options });
export const useClinicalTemplateServiceGetApiMasterClinicalTemplate = <TData = Common.ClinicalTemplateServiceGetApiMasterClinicalTemplateDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ active, clinicUuid, page, size, sortBy, sortDirection, templateType, title }: {
  active?: boolean;
  clinicUuid?: string;
  page?: number;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
  templateType?: "ROS" | "PE" | "SOAP_NOTE" | "SIMPLE_NOTE" | "CONSULTATION_NOTE";
  title?: string;
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseClinicalTemplateServiceGetApiMasterClinicalTemplateKeyFn({ active, clinicUuid, page, size, sortBy, sortDirection, templateType, title }, queryKey), queryFn: () => ClinicalTemplateService.getApiMasterClinicalTemplate({ active, clinicUuid, page, size, sortBy, sortDirection, templateType, title }) as TData, ...options });
export const useClinicalTemplateServiceGetApiMasterClinicalTemplateByTemplateId = <TData = Common.ClinicalTemplateServiceGetApiMasterClinicalTemplateByTemplateIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ templateId }: {
  templateId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseClinicalTemplateServiceGetApiMasterClinicalTemplateByTemplateIdKeyFn({ templateId }, queryKey), queryFn: () => ClinicalTemplateService.getApiMasterClinicalTemplateByTemplateId({ templateId }) as TData, ...options });
export const useClinicalTemplateServiceGetApiMasterClinicalTemplateClinicByClinicUuid = <TData = Common.ClinicalTemplateServiceGetApiMasterClinicalTemplateClinicByClinicUuidDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ clinicUuid }: {
  clinicUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseClinicalTemplateServiceGetApiMasterClinicalTemplateClinicByClinicUuidKeyFn({ clinicUuid }, queryKey), queryFn: () => ClinicalTemplateService.getApiMasterClinicalTemplateClinicByClinicUuid({ clinicUuid }) as TData, ...options });
export const useClinicalTemplateServiceGetApiMasterClinicalTemplateClinicByClinicUuidTypeByTemplateType = <TData = Common.ClinicalTemplateServiceGetApiMasterClinicalTemplateClinicByClinicUuidTypeByTemplateTypeDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ clinicUuid, templateType }: {
  clinicUuid: string;
  templateType: "ROS" | "PE" | "SOAP_NOTE" | "SIMPLE_NOTE" | "CONSULTATION_NOTE";
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseClinicalTemplateServiceGetApiMasterClinicalTemplateClinicByClinicUuidTypeByTemplateTypeKeyFn({ clinicUuid, templateType }, queryKey), queryFn: () => ClinicalTemplateService.getApiMasterClinicalTemplateClinicByClinicUuidTypeByTemplateType({ clinicUuid, templateType }) as TData, ...options });
export const useClinicControllerServiceGetApiMasterClinic = <TData = Common.ClinicControllerServiceGetApiMasterClinicDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ archive, page, searchString, size, sortBy, sortDirection, state, status }: {
  archive?: boolean;
  page?: number;
  searchString?: string;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
  state?: string;
  status?: boolean;
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseClinicControllerServiceGetApiMasterClinicKeyFn({ archive, page, searchString, size, sortBy, sortDirection, state, status }, queryKey), queryFn: () => ClinicControllerService.getApiMasterClinic({ archive, page, searchString, size, sortBy, sortDirection, state, status }) as TData, ...options });
export const useClinicControllerServiceGetApiMasterClinicByClinicId = <TData = Common.ClinicControllerServiceGetApiMasterClinicByClinicIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ clinicId }: {
  clinicId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseClinicControllerServiceGetApiMasterClinicByClinicIdKeyFn({ clinicId }, queryKey), queryFn: () => ClinicControllerService.getApiMasterClinicByClinicId({ clinicId }) as TData, ...options });
export const useAppointmentManagementServiceGetApiMasterAppointments = <TData = Common.AppointmentManagementServiceGetApiMasterAppointmentsDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ active, appointmentModes, appointmentStatuses, appointmentTypes, archive, clinicUuid, endDate, locationUuid, page, patientUuid, providerUuid, searchString, size, sortBy, sortDirection, startDate, timeFilter }: {
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
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseAppointmentManagementServiceGetApiMasterAppointmentsKeyFn({ active, appointmentModes, appointmentStatuses, appointmentTypes, archive, clinicUuid, endDate, locationUuid, page, patientUuid, providerUuid, searchString, size, sortBy, sortDirection, startDate, timeFilter }, queryKey), queryFn: () => AppointmentManagementService.getApiMasterAppointments({ active, appointmentModes, appointmentStatuses, appointmentTypes, archive, clinicUuid, endDate, locationUuid, page, patientUuid, providerUuid, searchString, size, sortBy, sortDirection, startDate, timeFilter }) as TData, ...options });
export const useAppointmentManagementServiceGetApiMasterAppointmentsByAppointmentId = <TData = Common.AppointmentManagementServiceGetApiMasterAppointmentsByAppointmentIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ appointmentId }: {
  appointmentId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseAppointmentManagementServiceGetApiMasterAppointmentsByAppointmentIdKeyFn({ appointmentId }, queryKey), queryFn: () => AppointmentManagementService.getApiMasterAppointmentsByAppointmentId({ appointmentId }) as TData, ...options });
export const useAppointmentManagementServiceGetApiMasterAppointmentsToday = <TData = Common.AppointmentManagementServiceGetApiMasterAppointmentsTodayDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseAppointmentManagementServiceGetApiMasterAppointmentsTodayKeyFn(queryKey), queryFn: () => AppointmentManagementService.getApiMasterAppointmentsToday() as TData, ...options });
export const useAppointmentTypeManagementServiceGetApiMasterAppointmentTypesByUuid = <TData = Common.AppointmentTypeManagementServiceGetApiMasterAppointmentTypesByUuidDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ uuid }: {
  uuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseAppointmentTypeManagementServiceGetApiMasterAppointmentTypesByUuidKeyFn({ uuid }, queryKey), queryFn: () => AppointmentTypeManagementService.getApiMasterAppointmentTypesByUuid({ uuid }) as TData, ...options });
export const useAppointmentTypeManagementServiceGetApiMasterAppointmentTypes = <TData = Common.AppointmentTypeManagementServiceGetApiMasterAppointmentTypesDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ page, size, title }: {
  page?: number;
  size?: number;
  title?: string;
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseAppointmentTypeManagementServiceGetApiMasterAppointmentTypesKeyFn({ page, size, title }, queryKey), queryFn: () => AppointmentTypeManagementService.getApiMasterAppointmentTypes({ page, size, title }) as TData, ...options });
export const useStripeControllerServiceGetApiMasterStripeByClinicId = <TData = Common.StripeControllerServiceGetApiMasterStripeByClinicIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ clinicId }: {
  clinicId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseStripeControllerServiceGetApiMasterStripeByClinicIdKeyFn({ clinicId }, queryKey), queryFn: () => StripeControllerService.getApiMasterStripeByClinicId({ clinicId }) as TData, ...options });
export const useStripeControllerServiceGetApiMasterStripePaymentMethodByPatientClinicUuid = <TData = Common.StripeControllerServiceGetApiMasterStripePaymentMethodByPatientClinicUuidDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ active, archive, page, patientClinicUuid, size, sortBy, sortDirection }: {
  active?: boolean;
  archive?: boolean;
  page?: number;
  patientClinicUuid: string;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseStripeControllerServiceGetApiMasterStripePaymentMethodByPatientClinicUuidKeyFn({ active, archive, page, patientClinicUuid, size, sortBy, sortDirection }, queryKey), queryFn: () => StripeControllerService.getApiMasterStripePaymentMethodByPatientClinicUuid({ active, archive, page, patientClinicUuid, size, sortBy, sortDirection }) as TData, ...options });
export const useSpecialityControllerServiceGetApiMasterSpeciality = <TData = Common.SpecialityControllerServiceGetApiMasterSpecialityDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ page, size, sortBy, sortDirection }: {
  page?: number;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseSpecialityControllerServiceGetApiMasterSpecialityKeyFn({ page, size, sortBy, sortDirection }, queryKey), queryFn: () => SpecialityControllerService.getApiMasterSpeciality({ page, size, sortBy, sortDirection }) as TData, ...options });
export const useSpecialityControllerServiceGetApiMasterSpecialityAll = <TData = Common.SpecialityControllerServiceGetApiMasterSpecialityAllDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseSpecialityControllerServiceGetApiMasterSpecialityAllKeyFn(queryKey), queryFn: () => SpecialityControllerService.getApiMasterSpecialityAll() as TData, ...options });
export const useRequestAppointmentManagementServiceGetApiMasterRequestAppointmentByUuid = <TData = Common.RequestAppointmentManagementServiceGetApiMasterRequestAppointmentByUuidDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ uuid }: {
  uuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseRequestAppointmentManagementServiceGetApiMasterRequestAppointmentByUuidKeyFn({ uuid }, queryKey), queryFn: () => RequestAppointmentManagementService.getApiMasterRequestAppointmentByUuid({ uuid }) as TData, ...options });
export const useRequestAppointmentManagementServiceGetApiMasterRequestAppointmentAll = <TData = Common.RequestAppointmentManagementServiceGetApiMasterRequestAppointmentAllDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ active, archive, clinicUuid, page, patientUuid, providerUuid, size, sortBy, sortDirection, status }: {
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
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseRequestAppointmentManagementServiceGetApiMasterRequestAppointmentAllKeyFn({ active, archive, clinicUuid, page, patientUuid, providerUuid, size, sortBy, sortDirection, status }, queryKey), queryFn: () => RequestAppointmentManagementService.getApiMasterRequestAppointmentAll({ active, archive, clinicUuid, page, patientUuid, providerUuid, size, sortBy, sortDirection, status }) as TData, ...options });
export const useAvailabilityManagementServiceGetApiMasterSlots = <TData = Common.AvailabilityManagementServiceGetApiMasterSlotsDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ appointmentTypeUuid, availabilityMode, clinicUuid, endDate, locationUuid, providerUuid, startDate }: {
  appointmentTypeUuid: string;
  availabilityMode?: "IN_PERSON" | "VIRTUAL" | "HOME";
  clinicUuid?: string;
  endDate?: string;
  locationUuid?: string;
  providerUuid: string;
  startDate?: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseAvailabilityManagementServiceGetApiMasterSlotsKeyFn({ appointmentTypeUuid, availabilityMode, clinicUuid, endDate, locationUuid, providerUuid, startDate }, queryKey), queryFn: () => AvailabilityManagementService.getApiMasterSlots({ appointmentTypeUuid, availabilityMode, clinicUuid, endDate, locationUuid, providerUuid, startDate }) as TData, ...options });
export const useAvailabilityManagementServiceGetApiMasterProviderByProviderUuidAvailabilitySetting = <TData = Common.AvailabilityManagementServiceGetApiMasterProviderByProviderUuidAvailabilitySettingDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ providerUuid }: {
  providerUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseAvailabilityManagementServiceGetApiMasterProviderByProviderUuidAvailabilitySettingKeyFn({ providerUuid }, queryKey), queryFn: () => AvailabilityManagementService.getApiMasterProviderByProviderUuidAvailabilitySetting({ providerUuid }) as TData, ...options });
export const usePharmacyLabRadiologyControllerServiceGetApiMasterPharmacyLabRadiology = <TData = Common.PharmacyLabRadiologyControllerServiceGetApiMasterPharmacyLabRadiologyDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ page, searchString, size, sortBy, sortDirection, type }: {
  page?: number;
  searchString?: string;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
  type?: "LAB" | "PHARMACY" | "RADIOLOGY";
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UsePharmacyLabRadiologyControllerServiceGetApiMasterPharmacyLabRadiologyKeyFn({ page, searchString, size, sortBy, sortDirection, type }, queryKey), queryFn: () => PharmacyLabRadiologyControllerService.getApiMasterPharmacyLabRadiology({ page, searchString, size, sortBy, sortDirection, type }) as TData, ...options });
export const usePharmacyLabRadiologyControllerServiceGetApiMasterPharmacyLabRadiologyByPreferenceUuid = <TData = Common.PharmacyLabRadiologyControllerServiceGetApiMasterPharmacyLabRadiologyByPreferenceUuidDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ preferenceUuid }: {
  preferenceUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UsePharmacyLabRadiologyControllerServiceGetApiMasterPharmacyLabRadiologyByPreferenceUuidKeyFn({ preferenceUuid }, queryKey), queryFn: () => PharmacyLabRadiologyControllerService.getApiMasterPharmacyLabRadiologyByPreferenceUuid({ preferenceUuid }) as TData, ...options });
export const useMigrationControllerServiceGetApiMasterDataImport = <TData = Common.MigrationControllerServiceGetApiMasterDataImportDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ clinicUuid, page, size, sortBy, sortDirection, type }: {
  clinicUuid?: string;
  page?: number;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
  type?: "CPT" | "ICD" | "CUSTOM" | "HCPCS" | "LOINC" | "PAYER_CATALOG" | "PATIENT" | "PROVIDER";
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseMigrationControllerServiceGetApiMasterDataImportKeyFn({ clinicUuid, page, size, sortBy, sortDirection, type }, queryKey), queryFn: () => MigrationControllerService.getApiMasterDataImport({ clinicUuid, page, size, sortBy, sortDirection, type }) as TData, ...options });
export const useMigrationControllerServiceGetApiMasterDataImportSampleByCategory = <TData = Common.MigrationControllerServiceGetApiMasterDataImportSampleByCategoryDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ category }: {
  category: "CPT" | "ICD" | "CUSTOM" | "HCPCS" | "LOINC" | "PAYER_CATALOG" | "PATIENT" | "PROVIDER";
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseMigrationControllerServiceGetApiMasterDataImportSampleByCategoryKeyFn({ category }, queryKey), queryFn: () => MigrationControllerService.getApiMasterDataImportSampleByCategory({ category }) as TData, ...options });
export const useVideoControllerServiceGetApiMasterVideoTokenByRoom = <TData = Common.VideoControllerServiceGetApiMasterVideoTokenByRoomDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ authorization, room }: {
  authorization?: string;
  room: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseVideoControllerServiceGetApiMasterVideoTokenByRoomKeyFn({ authorization, room }, queryKey), queryFn: () => VideoControllerService.getApiMasterVideoTokenByRoom({ authorization, room }) as TData, ...options });
export const useVaccinesControllerServiceGetApiMasterVaccine = <TData = Common.VaccinesControllerServiceGetApiMasterVaccineDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ page, searchString, size, sortBy, sortDirection }: {
  page?: number;
  searchString?: string;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseVaccinesControllerServiceGetApiMasterVaccineKeyFn({ page, searchString, size, sortBy, sortDirection }, queryKey), queryFn: () => VaccinesControllerService.getApiMasterVaccine({ page, searchString, size, sortBy, sortDirection }) as TData, ...options });
export const useLicenseStateControllerServiceGetApiMasterStateList = <TData = Common.LicenseStateControllerServiceGetApiMasterStateListDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ page, searchString, size }: {
  page?: number;
  searchString?: string;
  size?: number;
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseLicenseStateControllerServiceGetApiMasterStateListKeyFn({ page, searchString, size }, queryKey), queryFn: () => LicenseStateControllerService.getApiMasterStateList({ page, searchString, size }) as TData, ...options });
export const useInsurancePayerControllerServiceGetApiMasterInsurancePayers = <TData = Common.InsurancePayerControllerServiceGetApiMasterInsurancePayersDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ page, searchString, size, sortBy, sortDirection }: {
  page?: number;
  searchString?: string;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseInsurancePayerControllerServiceGetApiMasterInsurancePayersKeyFn({ page, searchString, size, sortBy, sortDirection }, queryKey), queryFn: () => InsurancePayerControllerService.getApiMasterInsurancePayers({ page, searchString, size, sortBy, sortDirection }) as TData, ...options });
export const useAllergyControllerServiceGetApiMasterAllergy = <TData = Common.AllergyControllerServiceGetApiMasterAllergyDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ page, size, sort, sortBy }: {
  page?: number;
  size?: number;
  sort?: string;
  sortBy?: string;
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseAllergyControllerServiceGetApiMasterAllergyKeyFn({ page, size, sort, sortBy }, queryKey), queryFn: () => AllergyControllerService.getApiMasterAllergy({ page, size, sort, sortBy }) as TData, ...options });
export const useUserControllerServicePostApiMasterUser = <TData = Common.UserControllerServicePostApiMasterUserMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: User;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: User;
}, TContext>({ mutationFn: ({ requestBody }) => UserControllerService.postApiMasterUser({ requestBody }) as unknown as Promise<TData>, ...options });
export const useUserControllerServicePostApiMasterSetResetPasswordByLinkType = <TData = Common.UserControllerServicePostApiMasterSetResetPasswordByLinkTypeMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  linkType: string;
  requestBody: SetPasswordRequest;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  linkType: string;
  requestBody: SetPasswordRequest;
}, TContext>({ mutationFn: ({ linkType, requestBody }) => UserControllerService.postApiMasterSetResetPasswordByLinkType({ linkType, requestBody }) as unknown as Promise<TData>, ...options });
export const useUserControllerServicePostApiMasterSetPasswordByLinkType = <TData = Common.UserControllerServicePostApiMasterSetPasswordByLinkTypeMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  linkType: string;
  requestBody: ResetPasswordRequest;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  linkType: string;
  requestBody: ResetPasswordRequest;
}, TContext>({ mutationFn: ({ linkType, requestBody }) => UserControllerService.postApiMasterSetPasswordByLinkType({ linkType, requestBody }) as unknown as Promise<TData>, ...options });
export const useUserControllerServicePostApiMasterResendInvitationByUserId = <TData = Common.UserControllerServicePostApiMasterResendInvitationByUserIdMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  userId: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  userId: string;
}, TContext>({ mutationFn: ({ userId }) => UserControllerService.postApiMasterResendInvitationByUserId({ userId }) as unknown as Promise<TData>, ...options });
export const useUserControllerServicePostApiMasterLogin = <TData = Common.UserControllerServicePostApiMasterLoginMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: LoginRequest;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: LoginRequest;
}, TContext>({ mutationFn: ({ requestBody }) => UserControllerService.postApiMasterLogin({ requestBody }) as unknown as Promise<TData>, ...options });
export const useUserControllerServicePostApiMasterChangePassword = <TData = Common.UserControllerServicePostApiMasterChangePasswordMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: ChangePasswordRequest;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: ChangePasswordRequest;
}, TContext>({ mutationFn: ({ requestBody }) => UserControllerService.postApiMasterChangePassword({ requestBody }) as unknown as Promise<TData>, ...options });
export const useVisitNoteTemplateServicePostApiMasterVisitNoteTemplate = <TData = Common.VisitNoteTemplateServicePostApiMasterVisitNoteTemplateMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: VisitNoteTemplate;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: VisitNoteTemplate;
}, TContext>({ mutationFn: ({ requestBody }) => VisitNoteTemplateService.postApiMasterVisitNoteTemplate({ requestBody }) as unknown as Promise<TData>, ...options });
export const useVisitNoteTemplateServicePostApiMasterVisitNoteTemplateByTemplateIdClone = <TData = Common.VisitNoteTemplateServicePostApiMasterVisitNoteTemplateByTemplateIdCloneMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  newTemplateName: string;
  templateId: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  newTemplateName: string;
  templateId: string;
}, TContext>({ mutationFn: ({ newTemplateName, templateId }) => VisitNoteTemplateService.postApiMasterVisitNoteTemplateByTemplateIdClone({ newTemplateName, templateId }) as unknown as Promise<TData>, ...options });
export const useTextMacroControllerServicePostApiMasterTextMacro = <TData = Common.TextMacroControllerServicePostApiMasterTextMacroMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: TextMacro;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: TextMacro;
}, TContext>({ mutationFn: ({ requestBody }) => TextMacroControllerService.postApiMasterTextMacro({ requestBody }) as unknown as Promise<TData>, ...options });
export const useStickyNoteControllerServicePostApiMasterStickyNotes = <TData = Common.StickyNoteControllerServicePostApiMasterStickyNotesMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: StickyNotes;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: StickyNotes;
}, TContext>({ mutationFn: ({ requestBody }) => StickyNoteControllerService.postApiMasterStickyNotes({ requestBody }) as unknown as Promise<TData>, ...options });
export const useProviderControllerServicePostApiMasterProvider = <TData = Common.ProviderControllerServicePostApiMasterProviderMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: Provider;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: Provider;
}, TContext>({ mutationFn: ({ requestBody }) => ProviderControllerService.postApiMasterProvider({ requestBody }) as unknown as Promise<TData>, ...options });
export const usePrintConfigurationControllerServicePostApiMasterPrintConfiguration = <TData = Common.PrintConfigurationControllerServicePostApiMasterPrintConfigurationMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: PrintConfiguration;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: PrintConfiguration;
}, TContext>({ mutationFn: ({ requestBody }) => PrintConfigurationControllerService.postApiMasterPrintConfiguration({ requestBody }) as unknown as Promise<TData>, ...options });
export const usePatientControllerServicePostApiMasterPatient = <TData = Common.PatientControllerServicePostApiMasterPatientMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: Patient;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: Patient;
}, TContext>({ mutationFn: ({ requestBody }) => PatientControllerService.postApiMasterPatient({ requestBody }) as unknown as Promise<TData>, ...options });
export const usePatientControllerServicePostApiMasterPatientSetResetPasswordByLinkType = <TData = Common.PatientControllerServicePostApiMasterPatientSetResetPasswordByLinkTypeMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  linkType: string;
  requestBody: SetPasswordRequest;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  linkType: string;
  requestBody: SetPasswordRequest;
}, TContext>({ mutationFn: ({ linkType, requestBody }) => PatientControllerService.postApiMasterPatientSetResetPasswordByLinkType({ linkType, requestBody }) as unknown as Promise<TData>, ...options });
export const usePatientControllerServicePostApiMasterPatientSetPasswordByLinkType = <TData = Common.PatientControllerServicePostApiMasterPatientSetPasswordByLinkTypeMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  linkType: string;
  requestBody: ResetPasswordRequest;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  linkType: string;
  requestBody: ResetPasswordRequest;
}, TContext>({ mutationFn: ({ linkType, requestBody }) => PatientControllerService.postApiMasterPatientSetPasswordByLinkType({ linkType, requestBody }) as unknown as Promise<TData>, ...options });
export const usePatientControllerServicePostApiMasterPatientLogin = <TData = Common.PatientControllerServicePostApiMasterPatientLoginMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: LoginRequest;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: LoginRequest;
}, TContext>({ mutationFn: ({ requestBody }) => PatientControllerService.postApiMasterPatientLogin({ requestBody }) as unknown as Promise<TData>, ...options });
export const usePatientControllerServicePostApiMasterPatientChangePassword = <TData = Common.PatientControllerServicePostApiMasterPatientChangePasswordMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: ChangePasswordRequest;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: ChangePasswordRequest;
}, TContext>({ mutationFn: ({ requestBody }) => PatientControllerService.postApiMasterPatientChangePassword({ requestBody }) as unknown as Promise<TData>, ...options });
export const usePatientVaccineControllerServicePostApiMasterPatientVaccine = <TData = Common.PatientVaccineControllerServicePostApiMasterPatientVaccineMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: PatientVaccine;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: PatientVaccine;
}, TContext>({ mutationFn: ({ requestBody }) => PatientVaccineControllerService.postApiMasterPatientVaccine({ requestBody }) as unknown as Promise<TData>, ...options });
export const usePatientSurgicalHistoryControllerServicePostApiMasterPatientSurgicalHistory = <TData = Common.PatientSurgicalHistoryControllerServicePostApiMasterPatientSurgicalHistoryMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: PatientSurgicalHistory;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: PatientSurgicalHistory;
}, TContext>({ mutationFn: ({ requestBody }) => PatientSurgicalHistoryControllerService.postApiMasterPatientSurgicalHistory({ requestBody }) as unknown as Promise<TData>, ...options });
export const usePatientMedicalHistoryControllerServicePostApiMasterPatientMedicalHistory = <TData = Common.PatientMedicalHistoryControllerServicePostApiMasterPatientMedicalHistoryMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: PatientMedicalHistory;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: PatientMedicalHistory;
}, TContext>({ mutationFn: ({ requestBody }) => PatientMedicalHistoryControllerService.postApiMasterPatientMedicalHistory({ requestBody }) as unknown as Promise<TData>, ...options });
export const usePatientInsuranceControllerServicePostApiMasterPatientInsuranceByPatientClinicUuid = <TData = Common.PatientInsuranceControllerServicePostApiMasterPatientInsuranceByPatientClinicUuidMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  patientClinicUuid: string;
  requestBody: PatientInsurance;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  patientClinicUuid: string;
  requestBody: PatientInsurance;
}, TContext>({ mutationFn: ({ patientClinicUuid, requestBody }) => PatientInsuranceControllerService.postApiMasterPatientInsuranceByPatientClinicUuid({ patientClinicUuid, requestBody }) as unknown as Promise<TData>, ...options });
export const usePatientFlagControllerServicePostApiMasterPatientFlag = <TData = Common.PatientFlagControllerServicePostApiMasterPatientFlagMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: PatientFlag;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: PatientFlag;
}, TContext>({ mutationFn: ({ requestBody }) => PatientFlagControllerService.postApiMasterPatientFlag({ requestBody }) as unknown as Promise<TData>, ...options });
export const usePatientFamilyHistoryControllerServicePostApiMasterPatientFamilyHistory = <TData = Common.PatientFamilyHistoryControllerServicePostApiMasterPatientFamilyHistoryMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: PatientFamilyHistory;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: PatientFamilyHistory;
}, TContext>({ mutationFn: ({ requestBody }) => PatientFamilyHistoryControllerService.postApiMasterPatientFamilyHistory({ requestBody }) as unknown as Promise<TData>, ...options });
export const usePatientDocumentControllerServicePostApiMasterPatientDocumentUpload = <TData = Common.PatientDocumentControllerServicePostApiMasterPatientDocumentUploadMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  assigned: boolean;
  documentDate?: string;
  documentDescription?: string;
  documentFormat: "OTHER" | "PDF" | "MS_WORD" | "ZIP" | "X_GZIP" | "X_COMPRESSED" | "DOCX" | "RTF" | "PLAIN" | "XLSX" | "JPEG_IMAGE" | "MP4" | "PNG_IMAGE" | "GIF_IMAGE" | "BMP_IMAGE" | "WEBP_IMAGE" | "SVG_IMAGE" | "MPEG_AUDIO" | "CSV" | "JSON";
  documentTypeId: string;
  formData?: { file: Blob | File; };
  name: string;
  patientClinicId: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  assigned: boolean;
  documentDate?: string;
  documentDescription?: string;
  documentFormat: "OTHER" | "PDF" | "MS_WORD" | "ZIP" | "X_GZIP" | "X_COMPRESSED" | "DOCX" | "RTF" | "PLAIN" | "XLSX" | "JPEG_IMAGE" | "MP4" | "PNG_IMAGE" | "GIF_IMAGE" | "BMP_IMAGE" | "WEBP_IMAGE" | "SVG_IMAGE" | "MPEG_AUDIO" | "CSV" | "JSON";
  documentTypeId: string;
  formData?: { file: Blob | File; };
  name: string;
  patientClinicId: string;
}, TContext>({ mutationFn: ({ assigned, documentDate, documentDescription, documentFormat, documentTypeId, formData, name, patientClinicId }) => PatientDocumentControllerService.postApiMasterPatientDocumentUpload({ assigned, documentDate, documentDescription, documentFormat, documentTypeId, formData, name, patientClinicId }) as unknown as Promise<TData>, ...options });
export const usePatientDiagnosisControllerServicePostApiMasterPatientDiagnosis = <TData = Common.PatientDiagnosisControllerServicePostApiMasterPatientDiagnosisMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: PatientDiagnosis;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: PatientDiagnosis;
}, TContext>({ mutationFn: ({ requestBody }) => PatientDiagnosisControllerService.postApiMasterPatientDiagnosis({ requestBody }) as unknown as Promise<TData>, ...options });
export const usePatientClinicControllerServicePostApiMasterPatientClinic = <TData = Common.PatientClinicControllerServicePostApiMasterPatientClinicMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: PatientClinic;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: PatientClinic;
}, TContext>({ mutationFn: ({ requestBody }) => PatientClinicControllerService.postApiMasterPatientClinic({ requestBody }) as unknown as Promise<TData>, ...options });
export const usePatientClinicControllerServicePostApiMasterPatientClinicResendInvitationByPatientClinicUuid = <TData = Common.PatientClinicControllerServicePostApiMasterPatientClinicResendInvitationByPatientClinicUuidMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  patientClinicUuid: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  patientClinicUuid: string;
}, TContext>({ mutationFn: ({ patientClinicUuid }) => PatientClinicControllerService.postApiMasterPatientClinicResendInvitationByPatientClinicUuid({ patientClinicUuid }) as unknown as Promise<TData>, ...options });
export const usePatientAllergyControllerServicePostApiMasterPatientAllergy = <TData = Common.PatientAllergyControllerServicePostApiMasterPatientAllergyMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: PatientAllergy;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: PatientAllergy;
}, TContext>({ mutationFn: ({ requestBody }) => PatientAllergyControllerService.postApiMasterPatientAllergy({ requestBody }) as unknown as Promise<TData>, ...options });
export const useMedicalCodeControllerServicePostApiMasterMedicalCodes = <TData = Common.MedicalCodeControllerServicePostApiMasterMedicalCodesMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: MedicalCode;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: MedicalCode;
}, TContext>({ mutationFn: ({ requestBody }) => MedicalCodeControllerService.postApiMasterMedicalCodes({ requestBody }) as unknown as Promise<TData>, ...options });
export const useLocationControllerServicePostApiMasterLocation = <TData = Common.LocationControllerServicePostApiMasterLocationMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: Location;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: Location;
}, TContext>({ mutationFn: ({ requestBody }) => LocationControllerService.postApiMasterLocation({ requestBody }) as unknown as Promise<TData>, ...options });
export const useIntakeFormConsentTemplateServicePostApiMasterIntakeFormConsentTemplateCreate = <TData = Common.IntakeFormConsentTemplateServicePostApiMasterIntakeFormConsentTemplateCreateMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: IntakeFormConsentFormTemplate;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: IntakeFormConsentFormTemplate;
}, TContext>({ mutationFn: ({ requestBody }) => IntakeFormConsentTemplateService.postApiMasterIntakeFormConsentTemplateCreate({ requestBody }) as unknown as Promise<TData>, ...options });
export const useFeeScheduleControllerServicePostApiMasterFeeSchedule = <TData = Common.FeeScheduleControllerServicePostApiMasterFeeScheduleMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: FeeSchedule;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: FeeSchedule;
}, TContext>({ mutationFn: ({ requestBody }) => FeeScheduleControllerService.postApiMasterFeeSchedule({ requestBody }) as unknown as Promise<TData>, ...options });
export const useDocumentTypeControllerServicePostApiMasterDocumentType = <TData = Common.DocumentTypeControllerServicePostApiMasterDocumentTypeMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: DocumentType;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: DocumentType;
}, TContext>({ mutationFn: ({ requestBody }) => DocumentTypeControllerService.postApiMasterDocumentType({ requestBody }) as unknown as Promise<TData>, ...options });
export const useClinicalTemplateServicePostApiMasterClinicalTemplate = <TData = Common.ClinicalTemplateServicePostApiMasterClinicalTemplateMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: ClinicalTemplate;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: ClinicalTemplate;
}, TContext>({ mutationFn: ({ requestBody }) => ClinicalTemplateService.postApiMasterClinicalTemplate({ requestBody }) as unknown as Promise<TData>, ...options });
export const useClinicalTemplateServicePostApiMasterClinicalTemplateByTemplateIdClone = <TData = Common.ClinicalTemplateServicePostApiMasterClinicalTemplateByTemplateIdCloneMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  newTitle: string;
  templateId: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  newTitle: string;
  templateId: string;
}, TContext>({ mutationFn: ({ newTitle, templateId }) => ClinicalTemplateService.postApiMasterClinicalTemplateByTemplateIdClone({ newTitle, templateId }) as unknown as Promise<TData>, ...options });
export const useClinicControllerServicePostApiMasterClinic = <TData = Common.ClinicControllerServicePostApiMasterClinicMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: Clinic;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: Clinic;
}, TContext>({ mutationFn: ({ requestBody }) => ClinicControllerService.postApiMasterClinic({ requestBody }) as unknown as Promise<TData>, ...options });
export const useAppointmentManagementServicePostApiMasterAppointments = <TData = Common.AppointmentManagementServicePostApiMasterAppointmentsMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: Appointment;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: Appointment;
}, TContext>({ mutationFn: ({ requestBody }) => AppointmentManagementService.postApiMasterAppointments({ requestBody }) as unknown as Promise<TData>, ...options });
export const useAppointmentManagementServicePostApiMasterAppointmentsByAppointmentIdCheckOut = <TData = Common.AppointmentManagementServicePostApiMasterAppointmentsByAppointmentIdCheckOutMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  appointmentId: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  appointmentId: string;
}, TContext>({ mutationFn: ({ appointmentId }) => AppointmentManagementService.postApiMasterAppointmentsByAppointmentIdCheckOut({ appointmentId }) as unknown as Promise<TData>, ...options });
export const useAppointmentManagementServicePostApiMasterAppointmentsByAppointmentIdCheckIn = <TData = Common.AppointmentManagementServicePostApiMasterAppointmentsByAppointmentIdCheckInMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  appointmentId: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  appointmentId: string;
}, TContext>({ mutationFn: ({ appointmentId }) => AppointmentManagementService.postApiMasterAppointmentsByAppointmentIdCheckIn({ appointmentId }) as unknown as Promise<TData>, ...options });
export const useAppointmentTypeManagementServicePostApiMasterAppointmentTypes = <TData = Common.AppointmentTypeManagementServicePostApiMasterAppointmentTypesMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: AppointmentType;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: AppointmentType;
}, TContext>({ mutationFn: ({ requestBody }) => AppointmentTypeManagementService.postApiMasterAppointmentTypes({ requestBody }) as unknown as Promise<TData>, ...options });
export const useStripeControllerServicePostApiMasterStripeWebhook = <TData = Common.StripeControllerServicePostApiMasterStripeWebhookMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: { [key: string]: { [key: string]: unknown; }; };
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: { [key: string]: { [key: string]: unknown; }; };
}, TContext>({ mutationFn: ({ requestBody }) => StripeControllerService.postApiMasterStripeWebhook({ requestBody }) as unknown as Promise<TData>, ...options });
export const useStripeControllerServicePostApiMasterStripePaymentMethod = <TData = Common.StripeControllerServicePostApiMasterStripePaymentMethodMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: AddPaymentMethodRequest;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: AddPaymentMethodRequest;
}, TContext>({ mutationFn: ({ requestBody }) => StripeControllerService.postApiMasterStripePaymentMethod({ requestBody }) as unknown as Promise<TData>, ...options });
export const useStripeControllerServicePostApiMasterStripeCustomer = <TData = Common.StripeControllerServicePostApiMasterStripeCustomerMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: PatientClinic;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: PatientClinic;
}, TContext>({ mutationFn: ({ requestBody }) => StripeControllerService.postApiMasterStripeCustomer({ requestBody }) as unknown as Promise<TData>, ...options });
export const useStripeControllerServicePostApiMasterStripeAccount = <TData = Common.StripeControllerServicePostApiMasterStripeAccountMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: Clinic;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: Clinic;
}, TContext>({ mutationFn: ({ requestBody }) => StripeControllerService.postApiMasterStripeAccount({ requestBody }) as unknown as Promise<TData>, ...options });
export const useSpecialityControllerServicePostApiMasterSpeciality = <TData = Common.SpecialityControllerServicePostApiMasterSpecialityMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: Speciality;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: Speciality;
}, TContext>({ mutationFn: ({ requestBody }) => SpecialityControllerService.postApiMasterSpeciality({ requestBody }) as unknown as Promise<TData>, ...options });
export const useRequestAppointmentManagementServicePostApiMasterRequestAppointmentReschedule = <TData = Common.RequestAppointmentManagementServicePostApiMasterRequestAppointmentRescheduleMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: RequestAppointment;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: RequestAppointment;
}, TContext>({ mutationFn: ({ requestBody }) => RequestAppointmentManagementService.postApiMasterRequestAppointmentReschedule({ requestBody }) as unknown as Promise<TData>, ...options });
export const useRequestAppointmentManagementServicePostApiMasterRequestAppointmentRequest = <TData = Common.RequestAppointmentManagementServicePostApiMasterRequestAppointmentRequestMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: RequestAppointment;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: RequestAppointment;
}, TContext>({ mutationFn: ({ requestBody }) => RequestAppointmentManagementService.postApiMasterRequestAppointmentRequest({ requestBody }) as unknown as Promise<TData>, ...options });
export const useRequestAppointmentManagementServicePostApiMasterRequestAppointmentCancel = <TData = Common.RequestAppointmentManagementServicePostApiMasterRequestAppointmentCancelMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: RequestAppointment;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: RequestAppointment;
}, TContext>({ mutationFn: ({ requestBody }) => RequestAppointmentManagementService.postApiMasterRequestAppointmentCancel({ requestBody }) as unknown as Promise<TData>, ...options });
export const useAvailabilityManagementServicePostApiMasterProviderAvailabilitySetting = <TData = Common.AvailabilityManagementServicePostApiMasterProviderAvailabilitySettingMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: AvailabilitySetting;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: AvailabilitySetting;
}, TContext>({ mutationFn: ({ requestBody }) => AvailabilityManagementService.postApiMasterProviderAvailabilitySetting({ requestBody }) as unknown as Promise<TData>, ...options });
export const usePharmacyLabRadiologyControllerServicePostApiMasterPharmacyLabRadiology = <TData = Common.PharmacyLabRadiologyControllerServicePostApiMasterPharmacyLabRadiologyMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: PharmacyLabRadiology;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: PharmacyLabRadiology;
}, TContext>({ mutationFn: ({ requestBody }) => PharmacyLabRadiologyControllerService.postApiMasterPharmacyLabRadiology({ requestBody }) as unknown as Promise<TData>, ...options });
export const useMigrationControllerServicePostApiMasterDataImportByCategoryUpload = <TData = Common.MigrationControllerServicePostApiMasterDataImportByCategoryUploadMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  category: "CPT" | "ICD" | "CUSTOM" | "HCPCS" | "LOINC" | "PAYER_CATALOG" | "PATIENT" | "PROVIDER";
  clinicUuid?: string;
  formData: { file: Blob | File; };
  title: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  category: "CPT" | "ICD" | "CUSTOM" | "HCPCS" | "LOINC" | "PAYER_CATALOG" | "PATIENT" | "PROVIDER";
  clinicUuid?: string;
  formData: { file: Blob | File; };
  title: string;
}, TContext>({ mutationFn: ({ category, clinicUuid, formData, title }) => MigrationControllerService.postApiMasterDataImportByCategoryUpload({ category, clinicUuid, formData, title }) as unknown as Promise<TData>, ...options });
export const useAuthControllerServicePostApiMasterAuthVerifyUserByEmailId = <TData = Common.AuthControllerServicePostApiMasterAuthVerifyUserByEmailIdMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  emailId: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  emailId: string;
}, TContext>({ mutationFn: ({ emailId }) => AuthControllerService.postApiMasterAuthVerifyUserByEmailId({ emailId }) as unknown as Promise<TData>, ...options });
export const useAuthControllerServicePostApiMasterAuthVerifyOtp = <TData = Common.AuthControllerServicePostApiMasterAuthVerifyOtpMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  isInvitation: boolean;
  requestBody: OtpVerificationRequest;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  isInvitation: boolean;
  requestBody: OtpVerificationRequest;
}, TContext>({ mutationFn: ({ isInvitation, requestBody }) => AuthControllerService.postApiMasterAuthVerifyOtp({ isInvitation, requestBody }) as unknown as Promise<TData>, ...options });
export const useAuthControllerServicePostApiMasterAuthSetPassword = <TData = Common.AuthControllerServicePostApiMasterAuthSetPasswordMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: ResetPasswordRequest;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: ResetPasswordRequest;
}, TContext>({ mutationFn: ({ requestBody }) => AuthControllerService.postApiMasterAuthSetPassword({ requestBody }) as unknown as Promise<TData>, ...options });
export const useAuthControllerServicePostApiMasterAuthResendOtpByOtpType = <TData = Common.AuthControllerServicePostApiMasterAuthResendOtpByOtpTypeMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  otpType: "SET" | "RESET";
  requestBody: SetPasswordRequest;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  otpType: "SET" | "RESET";
  requestBody: SetPasswordRequest;
}, TContext>({ mutationFn: ({ otpType, requestBody }) => AuthControllerService.postApiMasterAuthResendOtpByOtpType({ otpType, requestBody }) as unknown as Promise<TData>, ...options });
export const useAuthControllerServicePostApiMasterAuthLogout = <TData = Common.AuthControllerServicePostApiMasterAuthLogoutMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: LogoutRequest;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: LogoutRequest;
}, TContext>({ mutationFn: ({ requestBody }) => AuthControllerService.postApiMasterAuthLogout({ requestBody }) as unknown as Promise<TData>, ...options });
export const useAuthControllerServicePostApiMasterAuthAllowlist = <TData = Common.AuthControllerServicePostApiMasterAuthAllowlistMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  email: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  email: string;
}, TContext>({ mutationFn: ({ email }) => AuthControllerService.postApiMasterAuthAllowlist({ email }) as unknown as Promise<TData>, ...options });
export const useAuthControllerServicePostApiMasterAuthAccessToken = <TData = Common.AuthControllerServicePostApiMasterAuthAccessTokenMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  refreshToken: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  refreshToken: string;
}, TContext>({ mutationFn: ({ refreshToken }) => AuthControllerService.postApiMasterAuthAccessToken({ refreshToken }) as unknown as Promise<TData>, ...options });
export const useUserControllerServicePutApiMasterByUserIdArchiveStatusByStatus = <TData = Common.UserControllerServicePutApiMasterByUserIdArchiveStatusByStatusMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  status: boolean;
  userId: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  status: boolean;
  userId: string;
}, TContext>({ mutationFn: ({ status, userId }) => UserControllerService.putApiMasterByUserIdArchiveStatusByStatus({ status, userId }) as unknown as Promise<TData>, ...options });
export const useUserControllerServicePutApiMasterUser = <TData = Common.UserControllerServicePutApiMasterUserMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: User;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: User;
}, TContext>({ mutationFn: ({ requestBody }) => UserControllerService.putApiMasterUser({ requestBody }) as unknown as Promise<TData>, ...options });
export const useUserControllerServicePutApiMasterUserByUserIdStatusByStatus = <TData = Common.UserControllerServicePutApiMasterUserByUserIdStatusByStatusMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  status: boolean;
  userId: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  status: boolean;
  userId: string;
}, TContext>({ mutationFn: ({ status, userId }) => UserControllerService.putApiMasterUserByUserIdStatusByStatus({ status, userId }) as unknown as Promise<TData>, ...options });
export const useVisitNoteTemplateServicePutApiMasterVisitNoteTemplate = <TData = Common.VisitNoteTemplateServicePutApiMasterVisitNoteTemplateMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: VisitNoteTemplate;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: VisitNoteTemplate;
}, TContext>({ mutationFn: ({ requestBody }) => VisitNoteTemplateService.putApiMasterVisitNoteTemplate({ requestBody }) as unknown as Promise<TData>, ...options });
export const useTextMacroControllerServicePutApiMasterTextMacro = <TData = Common.TextMacroControllerServicePutApiMasterTextMacroMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: TextMacro;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: TextMacro;
}, TContext>({ mutationFn: ({ requestBody }) => TextMacroControllerService.putApiMasterTextMacro({ requestBody }) as unknown as Promise<TData>, ...options });
export const useStickyNoteControllerServicePutApiMasterStickyNotes = <TData = Common.StickyNoteControllerServicePutApiMasterStickyNotesMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: StickyNotes;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: StickyNotes;
}, TContext>({ mutationFn: ({ requestBody }) => StickyNoteControllerService.putApiMasterStickyNotes({ requestBody }) as unknown as Promise<TData>, ...options });
export const useStickyNoteControllerServicePutApiMasterStickyNotesByStickyNoteIdStatusByStatus = <TData = Common.StickyNoteControllerServicePutApiMasterStickyNotesByStickyNoteIdStatusByStatusMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  status: boolean;
  stickyNoteId: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  status: boolean;
  stickyNoteId: string;
}, TContext>({ mutationFn: ({ status, stickyNoteId }) => StickyNoteControllerService.putApiMasterStickyNotesByStickyNoteIdStatusByStatus({ status, stickyNoteId }) as unknown as Promise<TData>, ...options });
export const useStickyNoteControllerServicePutApiMasterStickyNotesByStickyNoteIdArchiveStatusByStatus = <TData = Common.StickyNoteControllerServicePutApiMasterStickyNotesByStickyNoteIdArchiveStatusByStatusMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  status: boolean;
  stickyNoteId: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  status: boolean;
  stickyNoteId: string;
}, TContext>({ mutationFn: ({ status, stickyNoteId }) => StickyNoteControllerService.putApiMasterStickyNotesByStickyNoteIdArchiveStatusByStatus({ status, stickyNoteId }) as unknown as Promise<TData>, ...options });
export const useProviderControllerServicePutApiMasterProvider = <TData = Common.ProviderControllerServicePutApiMasterProviderMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: Provider;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: Provider;
}, TContext>({ mutationFn: ({ requestBody }) => ProviderControllerService.putApiMasterProvider({ requestBody }) as unknown as Promise<TData>, ...options });
export const usePrintConfigurationControllerServicePutApiMasterPrintConfiguration = <TData = Common.PrintConfigurationControllerServicePutApiMasterPrintConfigurationMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: PrintConfiguration;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: PrintConfiguration;
}, TContext>({ mutationFn: ({ requestBody }) => PrintConfigurationControllerService.putApiMasterPrintConfiguration({ requestBody }) as unknown as Promise<TData>, ...options });
export const usePatientControllerServicePutApiMasterPatient = <TData = Common.PatientControllerServicePutApiMasterPatientMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: Patient;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: Patient;
}, TContext>({ mutationFn: ({ requestBody }) => PatientControllerService.putApiMasterPatient({ requestBody }) as unknown as Promise<TData>, ...options });
export const usePatientControllerServicePutApiMasterPatientChangeAvatar = <TData = Common.PatientControllerServicePutApiMasterPatientChangeAvatarMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: ChangeAvatarRequest;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: ChangeAvatarRequest;
}, TContext>({ mutationFn: ({ requestBody }) => PatientControllerService.putApiMasterPatientChangeAvatar({ requestBody }) as unknown as Promise<TData>, ...options });
export const usePatientControllerServicePutApiMasterPatientAddSignature = <TData = Common.PatientControllerServicePutApiMasterPatientAddSignatureMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: AddSignatureRequest;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: AddSignatureRequest;
}, TContext>({ mutationFn: ({ requestBody }) => PatientControllerService.putApiMasterPatientAddSignature({ requestBody }) as unknown as Promise<TData>, ...options });
export const usePatientVaccineControllerServicePutApiMasterPatientVaccine = <TData = Common.PatientVaccineControllerServicePutApiMasterPatientVaccineMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: PatientVaccine;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: PatientVaccine;
}, TContext>({ mutationFn: ({ requestBody }) => PatientVaccineControllerService.putApiMasterPatientVaccine({ requestBody }) as unknown as Promise<TData>, ...options });
export const usePatientVaccineControllerServicePutApiMasterPatientVaccineByPatientVaccineIdStatusByStatus = <TData = Common.PatientVaccineControllerServicePutApiMasterPatientVaccineByPatientVaccineIdStatusByStatusMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  patientVaccineId: string;
  status: boolean;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  patientVaccineId: string;
  status: boolean;
}, TContext>({ mutationFn: ({ patientVaccineId, status }) => PatientVaccineControllerService.putApiMasterPatientVaccineByPatientVaccineIdStatusByStatus({ patientVaccineId, status }) as unknown as Promise<TData>, ...options });
export const usePatientVaccineControllerServicePutApiMasterPatientVaccineByPatientVaccineIdArchiveStatusByStatus = <TData = Common.PatientVaccineControllerServicePutApiMasterPatientVaccineByPatientVaccineIdArchiveStatusByStatusMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  patientVaccineId: string;
  status: boolean;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  patientVaccineId: string;
  status: boolean;
}, TContext>({ mutationFn: ({ patientVaccineId, status }) => PatientVaccineControllerService.putApiMasterPatientVaccineByPatientVaccineIdArchiveStatusByStatus({ patientVaccineId, status }) as unknown as Promise<TData>, ...options });
export const usePatientSurgicalHistoryControllerServicePutApiMasterPatientSurgicalHistory = <TData = Common.PatientSurgicalHistoryControllerServicePutApiMasterPatientSurgicalHistoryMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: PatientSurgicalHistory;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: PatientSurgicalHistory;
}, TContext>({ mutationFn: ({ requestBody }) => PatientSurgicalHistoryControllerService.putApiMasterPatientSurgicalHistory({ requestBody }) as unknown as Promise<TData>, ...options });
export const usePatientSurgicalHistoryControllerServicePutApiMasterPatientSurgicalHistoryByPatientSurgicalHistoryIdStatusByStatus = <TData = Common.PatientSurgicalHistoryControllerServicePutApiMasterPatientSurgicalHistoryByPatientSurgicalHistoryIdStatusByStatusMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  patientSurgicalHistoryId: string;
  status: boolean;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  patientSurgicalHistoryId: string;
  status: boolean;
}, TContext>({ mutationFn: ({ patientSurgicalHistoryId, status }) => PatientSurgicalHistoryControllerService.putApiMasterPatientSurgicalHistoryByPatientSurgicalHistoryIdStatusByStatus({ patientSurgicalHistoryId, status }) as unknown as Promise<TData>, ...options });
export const usePatientSurgicalHistoryControllerServicePutApiMasterPatientSurgicalHistoryByPatientSurgicalHistoryIdArchiveStatusByStatus = <TData = Common.PatientSurgicalHistoryControllerServicePutApiMasterPatientSurgicalHistoryByPatientSurgicalHistoryIdArchiveStatusByStatusMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  patientSurgicalHistoryId: string;
  status: boolean;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  patientSurgicalHistoryId: string;
  status: boolean;
}, TContext>({ mutationFn: ({ patientSurgicalHistoryId, status }) => PatientSurgicalHistoryControllerService.putApiMasterPatientSurgicalHistoryByPatientSurgicalHistoryIdArchiveStatusByStatus({ patientSurgicalHistoryId, status }) as unknown as Promise<TData>, ...options });
export const usePatientMedicalHistoryControllerServicePutApiMasterPatientMedicalHistory = <TData = Common.PatientMedicalHistoryControllerServicePutApiMasterPatientMedicalHistoryMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: PatientMedicalHistory;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: PatientMedicalHistory;
}, TContext>({ mutationFn: ({ requestBody }) => PatientMedicalHistoryControllerService.putApiMasterPatientMedicalHistory({ requestBody }) as unknown as Promise<TData>, ...options });
export const usePatientMedicalHistoryControllerServicePutApiMasterPatientMedicalHistoryByPatientMedicalHistoryIdStatusByStatus = <TData = Common.PatientMedicalHistoryControllerServicePutApiMasterPatientMedicalHistoryByPatientMedicalHistoryIdStatusByStatusMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  patientMedicalHistoryId: string;
  status: boolean;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  patientMedicalHistoryId: string;
  status: boolean;
}, TContext>({ mutationFn: ({ patientMedicalHistoryId, status }) => PatientMedicalHistoryControllerService.putApiMasterPatientMedicalHistoryByPatientMedicalHistoryIdStatusByStatus({ patientMedicalHistoryId, status }) as unknown as Promise<TData>, ...options });
export const usePatientMedicalHistoryControllerServicePutApiMasterPatientMedicalHistoryByPatientMedicalHistoryIdArchiveStatusByStatus = <TData = Common.PatientMedicalHistoryControllerServicePutApiMasterPatientMedicalHistoryByPatientMedicalHistoryIdArchiveStatusByStatusMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  patientMedicalHistoryId: string;
  status: boolean;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  patientMedicalHistoryId: string;
  status: boolean;
}, TContext>({ mutationFn: ({ patientMedicalHistoryId, status }) => PatientMedicalHistoryControllerService.putApiMasterPatientMedicalHistoryByPatientMedicalHistoryIdArchiveStatusByStatus({ patientMedicalHistoryId, status }) as unknown as Promise<TData>, ...options });
export const usePatientInsuranceControllerServicePutApiMasterPatientInsuranceByPatientInsuranceIdTypeByInsuranceType = <TData = Common.PatientInsuranceControllerServicePutApiMasterPatientInsuranceByPatientInsuranceIdTypeByInsuranceTypeMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  insuranceType: "PRIMARY" | "SECONDARY" | "TERTIARY" | "OTHER";
  patientInsuranceId: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  insuranceType: "PRIMARY" | "SECONDARY" | "TERTIARY" | "OTHER";
  patientInsuranceId: string;
}, TContext>({ mutationFn: ({ insuranceType, patientInsuranceId }) => PatientInsuranceControllerService.putApiMasterPatientInsuranceByPatientInsuranceIdTypeByInsuranceType({ insuranceType, patientInsuranceId }) as unknown as Promise<TData>, ...options });
export const usePatientInsuranceControllerServicePutApiMasterPatientInsuranceByPatientInsuranceIdStatusByStatus = <TData = Common.PatientInsuranceControllerServicePutApiMasterPatientInsuranceByPatientInsuranceIdStatusByStatusMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  patientInsuranceId: string;
  status: boolean;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  patientInsuranceId: string;
  status: boolean;
}, TContext>({ mutationFn: ({ patientInsuranceId, status }) => PatientInsuranceControllerService.putApiMasterPatientInsuranceByPatientInsuranceIdStatusByStatus({ patientInsuranceId, status }) as unknown as Promise<TData>, ...options });
export const usePatientInsuranceControllerServicePutApiMasterPatientInsuranceByPatientInsuranceIdArchiveStatusByStatus = <TData = Common.PatientInsuranceControllerServicePutApiMasterPatientInsuranceByPatientInsuranceIdArchiveStatusByStatusMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  patientInsuranceId: string;
  status: boolean;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  patientInsuranceId: string;
  status: boolean;
}, TContext>({ mutationFn: ({ patientInsuranceId, status }) => PatientInsuranceControllerService.putApiMasterPatientInsuranceByPatientInsuranceIdArchiveStatusByStatus({ patientInsuranceId, status }) as unknown as Promise<TData>, ...options });
export const usePatientInsuranceControllerServicePutApiMasterPatientInsuranceByPatientClinicUuid = <TData = Common.PatientInsuranceControllerServicePutApiMasterPatientInsuranceByPatientClinicUuidMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  patientClinicUuid: string;
  requestBody: PatientInsurance;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  patientClinicUuid: string;
  requestBody: PatientInsurance;
}, TContext>({ mutationFn: ({ patientClinicUuid, requestBody }) => PatientInsuranceControllerService.putApiMasterPatientInsuranceByPatientClinicUuid({ patientClinicUuid, requestBody }) as unknown as Promise<TData>, ...options });
export const usePatientFlagControllerServicePutApiMasterPatientFlag = <TData = Common.PatientFlagControllerServicePutApiMasterPatientFlagMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: PatientFlag;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: PatientFlag;
}, TContext>({ mutationFn: ({ requestBody }) => PatientFlagControllerService.putApiMasterPatientFlag({ requestBody }) as unknown as Promise<TData>, ...options });
export const usePatientFlagControllerServicePutApiMasterPatientFlagByPatientFlagIdStatusByStatus = <TData = Common.PatientFlagControllerServicePutApiMasterPatientFlagByPatientFlagIdStatusByStatusMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  patientFlagId: string;
  status: boolean;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  patientFlagId: string;
  status: boolean;
}, TContext>({ mutationFn: ({ patientFlagId, status }) => PatientFlagControllerService.putApiMasterPatientFlagByPatientFlagIdStatusByStatus({ patientFlagId, status }) as unknown as Promise<TData>, ...options });
export const usePatientFlagControllerServicePutApiMasterPatientFlagByPatientFlagIdArchiveByStatus = <TData = Common.PatientFlagControllerServicePutApiMasterPatientFlagByPatientFlagIdArchiveByStatusMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  patientFlagId: string;
  status: boolean;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  patientFlagId: string;
  status: boolean;
}, TContext>({ mutationFn: ({ patientFlagId, status }) => PatientFlagControllerService.putApiMasterPatientFlagByPatientFlagIdArchiveByStatus({ patientFlagId, status }) as unknown as Promise<TData>, ...options });
export const usePatientFlagControllerServicePutApiMasterPatientFlagUpdatePatientClinic = <TData = Common.PatientFlagControllerServicePutApiMasterPatientFlagUpdatePatientClinicMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: PatientFlagUpdateRequest;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: PatientFlagUpdateRequest;
}, TContext>({ mutationFn: ({ requestBody }) => PatientFlagControllerService.putApiMasterPatientFlagUpdatePatientClinic({ requestBody }) as unknown as Promise<TData>, ...options });
export const usePatientFamilyHistoryControllerServicePutApiMasterPatientFamilyHistory = <TData = Common.PatientFamilyHistoryControllerServicePutApiMasterPatientFamilyHistoryMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: PatientFamilyHistory;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: PatientFamilyHistory;
}, TContext>({ mutationFn: ({ requestBody }) => PatientFamilyHistoryControllerService.putApiMasterPatientFamilyHistory({ requestBody }) as unknown as Promise<TData>, ...options });
export const usePatientFamilyHistoryControllerServicePutApiMasterPatientFamilyHistoryByPatientFamilyHistoryIdStatusByStatus = <TData = Common.PatientFamilyHistoryControllerServicePutApiMasterPatientFamilyHistoryByPatientFamilyHistoryIdStatusByStatusMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  patientFamilyHistoryId: string;
  status: boolean;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  patientFamilyHistoryId: string;
  status: boolean;
}, TContext>({ mutationFn: ({ patientFamilyHistoryId, status }) => PatientFamilyHistoryControllerService.putApiMasterPatientFamilyHistoryByPatientFamilyHistoryIdStatusByStatus({ patientFamilyHistoryId, status }) as unknown as Promise<TData>, ...options });
export const usePatientFamilyHistoryControllerServicePutApiMasterPatientFamilyHistoryByPatientFamilyHistoryIdArchiveStatusByStatus = <TData = Common.PatientFamilyHistoryControllerServicePutApiMasterPatientFamilyHistoryByPatientFamilyHistoryIdArchiveStatusByStatusMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  patientFamilyHistoryId: string;
  status: boolean;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  patientFamilyHistoryId: string;
  status: boolean;
}, TContext>({ mutationFn: ({ patientFamilyHistoryId, status }) => PatientFamilyHistoryControllerService.putApiMasterPatientFamilyHistoryByPatientFamilyHistoryIdArchiveStatusByStatus({ patientFamilyHistoryId, status }) as unknown as Promise<TData>, ...options });
export const usePatientDocumentControllerServicePutApiMasterPatientDocument = <TData = Common.PatientDocumentControllerServicePutApiMasterPatientDocumentMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  documentDate?: string;
  documentDescription?: string;
  documentFormat?: "OTHER" | "PDF" | "MS_WORD" | "ZIP" | "X_GZIP" | "X_COMPRESSED" | "DOCX" | "RTF" | "PLAIN" | "XLSX" | "JPEG_IMAGE" | "MP4" | "PNG_IMAGE" | "GIF_IMAGE" | "BMP_IMAGE" | "WEBP_IMAGE" | "SVG_IMAGE" | "MPEG_AUDIO" | "CSV" | "JSON";
  documentTypeId: string;
  formData?: { file?: Blob | File; };
  name: string;
  patientDocumentId: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  documentDate?: string;
  documentDescription?: string;
  documentFormat?: "OTHER" | "PDF" | "MS_WORD" | "ZIP" | "X_GZIP" | "X_COMPRESSED" | "DOCX" | "RTF" | "PLAIN" | "XLSX" | "JPEG_IMAGE" | "MP4" | "PNG_IMAGE" | "GIF_IMAGE" | "BMP_IMAGE" | "WEBP_IMAGE" | "SVG_IMAGE" | "MPEG_AUDIO" | "CSV" | "JSON";
  documentTypeId: string;
  formData?: { file?: Blob | File; };
  name: string;
  patientDocumentId: string;
}, TContext>({ mutationFn: ({ documentDate, documentDescription, documentFormat, documentTypeId, formData, name, patientDocumentId }) => PatientDocumentControllerService.putApiMasterPatientDocument({ documentDate, documentDescription, documentFormat, documentTypeId, formData, name, patientDocumentId }) as unknown as Promise<TData>, ...options });
export const usePatientDocumentControllerServicePutApiMasterPatientDocumentByPatientDocumentIdStatusByStatus = <TData = Common.PatientDocumentControllerServicePutApiMasterPatientDocumentByPatientDocumentIdStatusByStatusMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  patientDocumentId: string;
  status: boolean;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  patientDocumentId: string;
  status: boolean;
}, TContext>({ mutationFn: ({ patientDocumentId, status }) => PatientDocumentControllerService.putApiMasterPatientDocumentByPatientDocumentIdStatusByStatus({ patientDocumentId, status }) as unknown as Promise<TData>, ...options });
export const usePatientDocumentControllerServicePutApiMasterPatientDocumentByPatientDocumentIdAssigned = <TData = Common.PatientDocumentControllerServicePutApiMasterPatientDocumentByPatientDocumentIdAssignedMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  patientDocumentId: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  patientDocumentId: string;
}, TContext>({ mutationFn: ({ patientDocumentId }) => PatientDocumentControllerService.putApiMasterPatientDocumentByPatientDocumentIdAssigned({ patientDocumentId }) as unknown as Promise<TData>, ...options });
export const usePatientDocumentControllerServicePutApiMasterPatientDocumentByPatientDocumentIdArchiveStatusByStatus = <TData = Common.PatientDocumentControllerServicePutApiMasterPatientDocumentByPatientDocumentIdArchiveStatusByStatusMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  patientDocumentId: string;
  status: boolean;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  patientDocumentId: string;
  status: boolean;
}, TContext>({ mutationFn: ({ patientDocumentId, status }) => PatientDocumentControllerService.putApiMasterPatientDocumentByPatientDocumentIdArchiveStatusByStatus({ patientDocumentId, status }) as unknown as Promise<TData>, ...options });
export const usePatientDiagnosisControllerServicePutApiMasterPatientDiagnosis = <TData = Common.PatientDiagnosisControllerServicePutApiMasterPatientDiagnosisMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: PatientDiagnosis;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: PatientDiagnosis;
}, TContext>({ mutationFn: ({ requestBody }) => PatientDiagnosisControllerService.putApiMasterPatientDiagnosis({ requestBody }) as unknown as Promise<TData>, ...options });
export const usePatientDiagnosisControllerServicePutApiMasterPatientDiagnosisByPatientDiagnosisIdStatusByStatus = <TData = Common.PatientDiagnosisControllerServicePutApiMasterPatientDiagnosisByPatientDiagnosisIdStatusByStatusMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  patientDiagnosisId: string;
  status: boolean;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  patientDiagnosisId: string;
  status: boolean;
}, TContext>({ mutationFn: ({ patientDiagnosisId, status }) => PatientDiagnosisControllerService.putApiMasterPatientDiagnosisByPatientDiagnosisIdStatusByStatus({ patientDiagnosisId, status }) as unknown as Promise<TData>, ...options });
export const usePatientDiagnosisControllerServicePutApiMasterPatientDiagnosisByPatientDiagnosisIdArchiveStatusByStatus = <TData = Common.PatientDiagnosisControllerServicePutApiMasterPatientDiagnosisByPatientDiagnosisIdArchiveStatusByStatusMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  patientDiagnosisId: string;
  status: boolean;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  patientDiagnosisId: string;
  status: boolean;
}, TContext>({ mutationFn: ({ patientDiagnosisId, status }) => PatientDiagnosisControllerService.putApiMasterPatientDiagnosisByPatientDiagnosisIdArchiveStatusByStatus({ patientDiagnosisId, status }) as unknown as Promise<TData>, ...options });
export const usePatientClinicControllerServicePutApiMasterPatientClinic = <TData = Common.PatientClinicControllerServicePutApiMasterPatientClinicMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: PatientClinic;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: PatientClinic;
}, TContext>({ mutationFn: ({ requestBody }) => PatientClinicControllerService.putApiMasterPatientClinic({ requestBody }) as unknown as Promise<TData>, ...options });
export const usePatientClinicControllerServicePutApiMasterPatientClinicByPatientClinicIdStatusByStatus = <TData = Common.PatientClinicControllerServicePutApiMasterPatientClinicByPatientClinicIdStatusByStatusMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  patientClinicId: string;
  status: boolean;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  patientClinicId: string;
  status: boolean;
}, TContext>({ mutationFn: ({ patientClinicId, status }) => PatientClinicControllerService.putApiMasterPatientClinicByPatientClinicIdStatusByStatus({ patientClinicId, status }) as unknown as Promise<TData>, ...options });
export const usePatientClinicControllerServicePutApiMasterPatientClinicByPatientClinicIdArchiveStatusByStatus = <TData = Common.PatientClinicControllerServicePutApiMasterPatientClinicByPatientClinicIdArchiveStatusByStatusMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  patientClinicId: string;
  status: boolean;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  patientClinicId: string;
  status: boolean;
}, TContext>({ mutationFn: ({ patientClinicId, status }) => PatientClinicControllerService.putApiMasterPatientClinicByPatientClinicIdArchiveStatusByStatus({ patientClinicId, status }) as unknown as Promise<TData>, ...options });
export const usePatientClinicPaymentMethodControllerServicePutApiMasterPatientClinicPaymentMethodByPaymentMethodIdStatusByStatus = <TData = Common.PatientClinicPaymentMethodControllerServicePutApiMasterPatientClinicPaymentMethodByPaymentMethodIdStatusByStatusMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  paymentMethodId: string;
  status: boolean;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  paymentMethodId: string;
  status: boolean;
}, TContext>({ mutationFn: ({ paymentMethodId, status }) => PatientClinicPaymentMethodControllerService.putApiMasterPatientClinicPaymentMethodByPaymentMethodIdStatusByStatus({ paymentMethodId, status }) as unknown as Promise<TData>, ...options });
export const usePatientClinicPaymentMethodControllerServicePutApiMasterPatientClinicPaymentMethodByPaymentMethodIdDefault = <TData = Common.PatientClinicPaymentMethodControllerServicePutApiMasterPatientClinicPaymentMethodByPaymentMethodIdDefaultMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  paymentMethodId: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  paymentMethodId: string;
}, TContext>({ mutationFn: ({ paymentMethodId }) => PatientClinicPaymentMethodControllerService.putApiMasterPatientClinicPaymentMethodByPaymentMethodIdDefault({ paymentMethodId }) as unknown as Promise<TData>, ...options });
export const usePatientClinicPaymentMethodControllerServicePutApiMasterPatientClinicPaymentMethodByPaymentMethodIdArchiveStatusByStatus = <TData = Common.PatientClinicPaymentMethodControllerServicePutApiMasterPatientClinicPaymentMethodByPaymentMethodIdArchiveStatusByStatusMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  paymentMethodId: string;
  status: boolean;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  paymentMethodId: string;
  status: boolean;
}, TContext>({ mutationFn: ({ paymentMethodId, status }) => PatientClinicPaymentMethodControllerService.putApiMasterPatientClinicPaymentMethodByPaymentMethodIdArchiveStatusByStatus({ paymentMethodId, status }) as unknown as Promise<TData>, ...options });
export const usePatientAllergyControllerServicePutApiMasterPatientAllergy = <TData = Common.PatientAllergyControllerServicePutApiMasterPatientAllergyMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: PatientAllergy;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: PatientAllergy;
}, TContext>({ mutationFn: ({ requestBody }) => PatientAllergyControllerService.putApiMasterPatientAllergy({ requestBody }) as unknown as Promise<TData>, ...options });
export const usePatientAllergyControllerServicePutApiMasterPatientAllergyByPatientAllergyIdStatusByStatus = <TData = Common.PatientAllergyControllerServicePutApiMasterPatientAllergyByPatientAllergyIdStatusByStatusMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  patientAllergyId: string;
  status: boolean;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  patientAllergyId: string;
  status: boolean;
}, TContext>({ mutationFn: ({ patientAllergyId, status }) => PatientAllergyControllerService.putApiMasterPatientAllergyByPatientAllergyIdStatusByStatus({ patientAllergyId, status }) as unknown as Promise<TData>, ...options });
export const usePatientAllergyControllerServicePutApiMasterPatientAllergyByPatientAllergyIdArchiveStatusByStatus = <TData = Common.PatientAllergyControllerServicePutApiMasterPatientAllergyByPatientAllergyIdArchiveStatusByStatusMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  patientAllergyId: string;
  status: boolean;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  patientAllergyId: string;
  status: boolean;
}, TContext>({ mutationFn: ({ patientAllergyId, status }) => PatientAllergyControllerService.putApiMasterPatientAllergyByPatientAllergyIdArchiveStatusByStatus({ patientAllergyId, status }) as unknown as Promise<TData>, ...options });
export const useMedicalCodeControllerServicePutApiMasterMedicalCodesByMedicalCodeIdStatusByStatus = <TData = Common.MedicalCodeControllerServicePutApiMasterMedicalCodesByMedicalCodeIdStatusByStatusMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  medicalCodeId: string;
  status: boolean;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  medicalCodeId: string;
  status: boolean;
}, TContext>({ mutationFn: ({ medicalCodeId, status }) => MedicalCodeControllerService.putApiMasterMedicalCodesByMedicalCodeIdStatusByStatus({ medicalCodeId, status }) as unknown as Promise<TData>, ...options });
export const useLocationControllerServicePutApiMasterLocation = <TData = Common.LocationControllerServicePutApiMasterLocationMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: Location;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: Location;
}, TContext>({ mutationFn: ({ requestBody }) => LocationControllerService.putApiMasterLocation({ requestBody }) as unknown as Promise<TData>, ...options });
export const useLocationControllerServicePutApiMasterLocationByLocationIdByStatus = <TData = Common.LocationControllerServicePutApiMasterLocationByLocationIdByStatusMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  locationId: string;
  status: boolean;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  locationId: string;
  status: boolean;
}, TContext>({ mutationFn: ({ locationId, status }) => LocationControllerService.putApiMasterLocationByLocationIdByStatus({ locationId, status }) as unknown as Promise<TData>, ...options });
export const useLocationControllerServicePutApiMasterLocationByLocationIdActiveByStatus = <TData = Common.LocationControllerServicePutApiMasterLocationByLocationIdActiveByStatusMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  locationId: string;
  status: boolean;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  locationId: string;
  status: boolean;
}, TContext>({ mutationFn: ({ locationId, status }) => LocationControllerService.putApiMasterLocationByLocationIdActiveByStatus({ locationId, status }) as unknown as Promise<TData>, ...options });
export const useIntakeFormConsentTemplateServicePutApiMasterIntakeFormConsentTemplateUpdate = <TData = Common.IntakeFormConsentTemplateServicePutApiMasterIntakeFormConsentTemplateUpdateMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: IntakeFormConsentFormTemplate;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: IntakeFormConsentFormTemplate;
}, TContext>({ mutationFn: ({ requestBody }) => IntakeFormConsentTemplateService.putApiMasterIntakeFormConsentTemplateUpdate({ requestBody }) as unknown as Promise<TData>, ...options });
export const useFeeScheduleControllerServicePutApiMasterFeeSchedule = <TData = Common.FeeScheduleControllerServicePutApiMasterFeeScheduleMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: FeeSchedule;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: FeeSchedule;
}, TContext>({ mutationFn: ({ requestBody }) => FeeScheduleControllerService.putApiMasterFeeSchedule({ requestBody }) as unknown as Promise<TData>, ...options });
export const useDocumentTypeControllerServicePutApiMasterDocumentType = <TData = Common.DocumentTypeControllerServicePutApiMasterDocumentTypeMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: DocumentType;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: DocumentType;
}, TContext>({ mutationFn: ({ requestBody }) => DocumentTypeControllerService.putApiMasterDocumentType({ requestBody }) as unknown as Promise<TData>, ...options });
export const useClinicalTemplateServicePutApiMasterClinicalTemplate = <TData = Common.ClinicalTemplateServicePutApiMasterClinicalTemplateMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: ClinicalTemplate;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: ClinicalTemplate;
}, TContext>({ mutationFn: ({ requestBody }) => ClinicalTemplateService.putApiMasterClinicalTemplate({ requestBody }) as unknown as Promise<TData>, ...options });
export const useClinicalTemplateServicePutApiMasterClinicalTemplateByTemplateIdUnarchive = <TData = Common.ClinicalTemplateServicePutApiMasterClinicalTemplateByTemplateIdUnarchiveMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  templateId: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  templateId: string;
}, TContext>({ mutationFn: ({ templateId }) => ClinicalTemplateService.putApiMasterClinicalTemplateByTemplateIdUnarchive({ templateId }) as unknown as Promise<TData>, ...options });
export const useClinicalTemplateServicePutApiMasterClinicalTemplateByTemplateIdToggleStatus = <TData = Common.ClinicalTemplateServicePutApiMasterClinicalTemplateByTemplateIdToggleStatusMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  templateId: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  templateId: string;
}, TContext>({ mutationFn: ({ templateId }) => ClinicalTemplateService.putApiMasterClinicalTemplateByTemplateIdToggleStatus({ templateId }) as unknown as Promise<TData>, ...options });
export const useClinicalTemplateServicePutApiMasterClinicalTemplateByTemplateIdArchive = <TData = Common.ClinicalTemplateServicePutApiMasterClinicalTemplateByTemplateIdArchiveMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  templateId: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  templateId: string;
}, TContext>({ mutationFn: ({ templateId }) => ClinicalTemplateService.putApiMasterClinicalTemplateByTemplateIdArchive({ templateId }) as unknown as Promise<TData>, ...options });
export const useClinicControllerServicePutApiMasterClinic = <TData = Common.ClinicControllerServicePutApiMasterClinicMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: Clinic;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: Clinic;
}, TContext>({ mutationFn: ({ requestBody }) => ClinicControllerService.putApiMasterClinic({ requestBody }) as unknown as Promise<TData>, ...options });
export const useClinicControllerServicePutApiMasterClinicByClinicIdStatusByStatus = <TData = Common.ClinicControllerServicePutApiMasterClinicByClinicIdStatusByStatusMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  clinicId: string;
  status: boolean;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  clinicId: string;
  status: boolean;
}, TContext>({ mutationFn: ({ clinicId, status }) => ClinicControllerService.putApiMasterClinicByClinicIdStatusByStatus({ clinicId, status }) as unknown as Promise<TData>, ...options });
export const useClinicControllerServicePutApiMasterClinicByClinicIdArchiveByStatus = <TData = Common.ClinicControllerServicePutApiMasterClinicByClinicIdArchiveByStatusMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  clinicId: string;
  status: boolean;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  clinicId: string;
  status: boolean;
}, TContext>({ mutationFn: ({ clinicId, status }) => ClinicControllerService.putApiMasterClinicByClinicIdArchiveByStatus({ clinicId, status }) as unknown as Promise<TData>, ...options });
export const useClinicControllerServicePutApiMasterClinicCharges = <TData = Common.ClinicControllerServicePutApiMasterClinicChargesMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: ClinicChargesUpdate;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: ClinicChargesUpdate;
}, TContext>({ mutationFn: ({ requestBody }) => ClinicControllerService.putApiMasterClinicCharges({ requestBody }) as unknown as Promise<TData>, ...options });
export const useAppointmentManagementServicePutApiMasterAppointments = <TData = Common.AppointmentManagementServicePutApiMasterAppointmentsMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: Appointment;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: Appointment;
}, TContext>({ mutationFn: ({ requestBody }) => AppointmentManagementService.putApiMasterAppointments({ requestBody }) as unknown as Promise<TData>, ...options });
export const useAppointmentTypeManagementServicePutApiMasterAppointmentTypesByUuid = <TData = Common.AppointmentTypeManagementServicePutApiMasterAppointmentTypesByUuidMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: AppointmentType;
  uuid: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: AppointmentType;
  uuid: string;
}, TContext>({ mutationFn: ({ requestBody, uuid }) => AppointmentTypeManagementService.putApiMasterAppointmentTypesByUuid({ requestBody, uuid }) as unknown as Promise<TData>, ...options });
export const useAppointmentManagementServicePatchApiMasterAppointmentsByUuidStatus = <TData = Common.AppointmentManagementServicePatchApiMasterAppointmentsByUuidStatusMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: AppointmentStatusUpdate;
  uuid: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: AppointmentStatusUpdate;
  uuid: string;
}, TContext>({ mutationFn: ({ requestBody, uuid }) => AppointmentManagementService.patchApiMasterAppointmentsByUuidStatus({ requestBody, uuid }) as unknown as Promise<TData>, ...options });
export const useAppointmentManagementServicePatchApiMasterAppointmentsByUuidReschedule = <TData = Common.AppointmentManagementServicePatchApiMasterAppointmentsByUuidRescheduleMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: RescheduleAppointmentDTO;
  uuid: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: RescheduleAppointmentDTO;
  uuid: string;
}, TContext>({ mutationFn: ({ requestBody, uuid }) => AppointmentManagementService.patchApiMasterAppointmentsByUuidReschedule({ requestBody, uuid }) as unknown as Promise<TData>, ...options });
export const useRequestAppointmentManagementServicePatchApiMasterRequestAppointmentByUuidStatus = <TData = Common.RequestAppointmentManagementServicePatchApiMasterRequestAppointmentByUuidStatusMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: RequestAppointmentStatusUpdate;
  uuid: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: RequestAppointmentStatusUpdate;
  uuid: string;
}, TContext>({ mutationFn: ({ requestBody, uuid }) => RequestAppointmentManagementService.patchApiMasterRequestAppointmentByUuidStatus({ requestBody, uuid }) as unknown as Promise<TData>, ...options });
export const useVisitNoteTemplateServiceDeleteApiMasterVisitNoteTemplateByTemplateId = <TData = Common.VisitNoteTemplateServiceDeleteApiMasterVisitNoteTemplateByTemplateIdMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  templateId: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  templateId: string;
}, TContext>({ mutationFn: ({ templateId }) => VisitNoteTemplateService.deleteApiMasterVisitNoteTemplateByTemplateId({ templateId }) as unknown as Promise<TData>, ...options });
export const useTextMacroControllerServiceDeleteApiMasterTextMacroByTextMacroUuid = <TData = Common.TextMacroControllerServiceDeleteApiMasterTextMacroByTextMacroUuidMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  textMacroUuid: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  textMacroUuid: string;
}, TContext>({ mutationFn: ({ textMacroUuid }) => TextMacroControllerService.deleteApiMasterTextMacroByTextMacroUuid({ textMacroUuid }) as unknown as Promise<TData>, ...options });
export const usePatientControllerServiceDeleteApiMasterPatientByPatientId = <TData = Common.PatientControllerServiceDeleteApiMasterPatientByPatientIdMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  patientId: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  patientId: string;
}, TContext>({ mutationFn: ({ patientId }) => PatientControllerService.deleteApiMasterPatientByPatientId({ patientId }) as unknown as Promise<TData>, ...options });
export const useFeeScheduleControllerServiceDeleteApiMasterFeeScheduleByFeeScheduleUuid = <TData = Common.FeeScheduleControllerServiceDeleteApiMasterFeeScheduleByFeeScheduleUuidMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  feeScheduleUuid: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  feeScheduleUuid: string;
}, TContext>({ mutationFn: ({ feeScheduleUuid }) => FeeScheduleControllerService.deleteApiMasterFeeScheduleByFeeScheduleUuid({ feeScheduleUuid }) as unknown as Promise<TData>, ...options });
export const useDocumentTypeControllerServiceDeleteApiMasterDocumentTypeByDocumentTypeId = <TData = Common.DocumentTypeControllerServiceDeleteApiMasterDocumentTypeByDocumentTypeIdMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  documentTypeId: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  documentTypeId: string;
}, TContext>({ mutationFn: ({ documentTypeId }) => DocumentTypeControllerService.deleteApiMasterDocumentTypeByDocumentTypeId({ documentTypeId }) as unknown as Promise<TData>, ...options });
export const useClinicalTemplateServiceDeleteApiMasterClinicalTemplateByTemplateId = <TData = Common.ClinicalTemplateServiceDeleteApiMasterClinicalTemplateByTemplateIdMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  templateId: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  templateId: string;
}, TContext>({ mutationFn: ({ templateId }) => ClinicalTemplateService.deleteApiMasterClinicalTemplateByTemplateId({ templateId }) as unknown as Promise<TData>, ...options });
export const useAppointmentTypeManagementServiceDeleteApiMasterAppointmentTypesByUuid = <TData = Common.AppointmentTypeManagementServiceDeleteApiMasterAppointmentTypesByUuidMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  uuid: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  uuid: string;
}, TContext>({ mutationFn: ({ uuid }) => AppointmentTypeManagementService.deleteApiMasterAppointmentTypesByUuid({ uuid }) as unknown as Promise<TData>, ...options });
export const useRequestAppointmentManagementServiceDeleteApiMasterRequestAppointmentByUuid = <TData = Common.RequestAppointmentManagementServiceDeleteApiMasterRequestAppointmentByUuidMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  uuid: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  uuid: string;
}, TContext>({ mutationFn: ({ uuid }) => RequestAppointmentManagementService.deleteApiMasterRequestAppointmentByUuid({ uuid }) as unknown as Promise<TData>, ...options });
