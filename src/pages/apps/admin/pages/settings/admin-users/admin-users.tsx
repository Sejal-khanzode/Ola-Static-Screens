import { useState, useEffect } from 'react';
import { Typography, Grid, SelectChangeEvent } from '@mui/material';
import { settingConstants } from '../../../../../../constants/admin-constants';
import { AddIcon } from '../../../../../../assets/icons/addIcon';
import CustomSelect from '../../../../../../components/core/reusable/custom-select/custom-select';
import CustomisedTable from '../../../../../../components/core/reusable/custom-table/custom-table';
import CustomDrawer from '../../../../../../components/core/reusable/custom-drawer/custom-drawer';
import ConfirmationPopUp from '../../../../../../components/core/reusable/confirmation-pop-up/confirmation-pop-up';
import AdminUserForm from './admin-user-form';
import { useMutation } from '@tanstack/react-query';
import { adminSettingsUsersHeader } from '../../../../../../components/core/reusable/headers/all-headers';
import { SearchIcon } from '../../../../../../assets/icons/searchIcon';
import CustomInput from '../../../../../../components/core/reusable/custom-input/custom-input';
import CustomButton from '../../../../../../components/core/reusable/custom-button/custom-button';
import useApiFeedback from '../../../../../../hooks/useApiFeedback';
import { formatRoleDisplay } from '../../../../../../utils/roleFormatter';
import { User, UserControllerService } from 'src/sdk/requests';
import CustomLabel from 'src/components/core/reusable/custom-label/custom-label';
import { FilterType } from '../../clinics/dashboard';
import { useUserControllerServiceGetApiMasterUsers } from '../../../../../../sdk/queries/queries';
import { hideLoader, showLoader } from 'src/redux/reducers/loaderReducer';
import { useDispatch } from 'react-redux';
import { formatPhoneNumber } from 'src/utils/toCamelCase';
import ViewUserDetails from './view-user-details';

export const STATUS_OPTIONS = [
  { value: 'All', label: 'All (Active + Inactive )' },
  { value: 'Active', label: 'Active' },
  { value: 'Inactive', label: 'Inactive' },
  { value: 'Archived', label: 'Archived' },
];

const AdminUsers = () => {
  const dispatch = useDispatch();
  const [openAddUserDialog, setOpenAddUserDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(0);
  const [statusType, setStatusType] = useState<FilterType>('All');
  const [pageSize, setPageSize] = useState(15);
  const [isArchiveConfirmOpen, setIsArchiveConfirmOpen] = useState(false);
  const [userToArchive, setUserToArchive] = useState<User | null>(null);
  const [isResendConfirmOpen, setIsResendConfirmOpen] = useState(false);
  const [userToResend, setUserToResend] = useState<User | null>(null);

  const { mutateAsync: fetchUserByIdAsync, isPending: isPendingGetUserByID } = useMutation({
    mutationFn: UserControllerService.getApiMasterUserByUserId,
  });

  const {
    mutateAsync: archiveUserAsync,
    isSuccess: isSuccessArchiveUser,
    isError: isErrorArchiveUser,
    error: errorArchiveUser,
    data: dataArchiveUser,
  } = useMutation({
    mutationFn: UserControllerService.putApiMasterByUserIdArchiveStatusByStatus,
  });

  const {
    mutateAsync: updateUserStatusAsync,
    data: userStatusData,
    isError: isErrorUserStatus,
    error: errorUserStatus,
    isSuccess: isSuccessUserStatus,
    isPending,
  } = useMutation({
    mutationFn: UserControllerService.putApiMasterUserByUserIdStatusByStatus,
  });

  const {
    mutateAsync: resendEmailAsync,
    data: resendEmailData,
    isError: isErrorResendEmail,
    error: errorResendEmail,
    isSuccess: isSuccessResendEmail,
    isPending: isPendingResendEmail,
  } = useMutation({
    mutationFn: UserControllerService.postApiMasterResendInvitationByUserId,
  });

  useApiFeedback(
    isErrorResendEmail,
    errorResendEmail,
    isSuccessResendEmail,
    (resendEmailData?.message || 'Email Sent successfully') as string
  );

  useApiFeedback(
    isErrorArchiveUser,
    errorArchiveUser,
    isSuccessArchiveUser,
    (dataArchiveUser?.message || 'User archive successfully') as string
  );
  useApiFeedback(
    isErrorUserStatus,
    errorUserStatus,
    isSuccessArchiveUser,
    (userStatusData?.message || 'User archive status updated successfully') as string
  );

  const {
    isLoading,
    data: filteredUserData,
    refetch,
    isPending: isPendingGetUser,
  } = useUserControllerServiceGetApiMasterUsers({
    page: page,
    size: pageSize,
    sortBy: 'created',
    status: statusType === 'Active' ? true : statusType === 'Inactive' ? false : undefined,
    archive: statusType === 'Archived' ? true : false,
    searchString: searchText,
  });

  useEffect(() => {
    if (
      isLoading ||
      isPending ||
      isPendingResendEmail ||
      isPendingGetUserByID ||
      isPendingGetUser
    ) {
      dispatch(showLoader());
    } else {
      dispatch(hideLoader());
    }
  }, [
    isLoading,
    isPending,
    dispatch,
    isPendingResendEmail || isPendingGetUserByID || isPendingGetUser,
  ]);

  useEffect(() => {
    if (isSuccessUserStatus || isSuccessArchiveUser) {
      RefetchUserData();
    }
  }, [isSuccessUserStatus, isSuccessArchiveUser]);

  const rawUsers = filteredUserData?.data?.content;

  const DisplayAdminUsersDataTable = Array.isArray(rawUsers)
    ? rawUsers?.map(user => ({
        ...user,
        uuid: user?.uuid,
        name: [user?.firstName, user?.lastName].filter(Boolean).join(' ') || '-',
        email: user?.email || '-',
        contact: user?.phone ? `${formatPhoneNumber(user?.phone)}` : '',
        role: Array.isArray(user?.roles)
          ? user?.roles?.map((role: string) => formatRoleDisplay(role)).join(', ')
          : formatRoleDisplay(user?.roles || '-'),
        status: user?.archive ? 'ARCHIVED' : user?.active ? 'ACTIVE' : 'INACTIVE',
        action: user?.archive
          ? [{ label: 'Restore', route: 'restore' }]
          : [
              { label: 'Edit', route: 'edit' },
              { label: 'Archive', route: 'archive' },
              // Only show Resend Invitation if email is not verified
              ...(user?.emailVerified === false
                ? [{ label: 'Resend Invite', route: 'resend' }]
                : []),
            ],
      }))
    : [];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 2) {
      setSearchText(e.target.value);
      setPage(0);
    } else if (e.target.value === '') {
      setSearchText('');
    }
  };

  const handleAddUser = () => {
    setSelectedUser(null);
    setIsEditMode(false);
    setOpenAddUserDialog(true);
  };

  const handleEdit = async (userDatas: any) => {
    try {
      const userData = await fetchUserByIdAsync({ userId: userDatas?.uuid });
      setSelectedUser(userData);
      setIsEditMode(true);
      setOpenAddUserDialog(true);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleArchive = (userRow: User) => {
    setUserToArchive(userRow);
    setIsArchiveConfirmOpen(true);
  };

  const handleConfirmArchive = async () => {
    try {
      if (!userToArchive?.uuid) return;

      const userData = await fetchUserByIdAsync({ userId: userToArchive.uuid });
      if (!userData) return;

      setSelectedUser(userData);

      const archivePayload = {
        userId: userToArchive.uuid,
        status: userData?.data?.archive === true ? false : true,
        // xTenantId: 'your-tenant-id',
      };

      await archiveUserAsync(archivePayload);
      setIsArchiveConfirmOpen(false);
      setUserToArchive(null);
    } catch (error) {
      console.error('Error archiving user:', error);
      setIsArchiveConfirmOpen(false);
      setUserToArchive(null);
    }
  };

  const handleCancelArchive = () => {
    setIsArchiveConfirmOpen(false);
    setUserToArchive(null);
  };

  const handleRestore = async (userRow: User) => {
    try {
      if (!userRow?.uuid) return;

      const userData = await fetchUserByIdAsync({ userId: userRow.uuid });
      if (!userData) return;

      setSelectedUser(userData);

      const restorePayload = {
        userId: userRow.uuid,
        status: false,
      };

      await archiveUserAsync(restorePayload);
    } catch (error) {
      console.error('Error restoring user:', error);
    }
  };

  const RefetchUserData = () => {
    refetch();
  };

  const handleUpdateStatus = async (rowData: any) => {
    try {
      const userId = rowData.uuid;
      if (!userId) {
        console.error('No user ID found in row data');
        return;
      }

      const userData = await fetchUserByIdAsync({ userId });
      if (!userData) return;

      setSelectedUser(userData);

      const updateUserStatusPayload = {
        userId,
        status: userData?.data?.active === true ? false : true,
      };

      await updateUserStatusAsync(updateUserStatusPayload);
    } catch (error) {
      console.error('Error updating user status:', error);
    }
  };

  const handleResend = (rowData: User) => {
    setUserToResend(rowData);
    setIsResendConfirmOpen(true);
  };

  const handleConfirmResend = async () => {
    try {
      if (!userToResend?.uuid) return;

      await resendEmailAsync({
        userId: userToResend.uuid,
      });
      setIsResendConfirmOpen(false);
      setUserToResend(null);
    } catch (error) {
      console.error('Error resending email:', error);
      setIsResendConfirmOpen(false);
      setUserToResend(null);
    }
  };

  const handleCancelResend = () => {
    setIsResendConfirmOpen(false);
    setUserToResend(null);
  };

  const handleTableAction = (action: string, rowData: any) => {
    if (action === 'edit') {
      handleEdit(rowData.uuid || rowData.id);
    } else if (action === 'archive') {
      handleArchive(rowData.uuid || rowData.id);
    } else if (action === 'restore') {
      handleRestore(rowData.uuid || rowData.id);
    } else if (action === 'resend') {
      handleResend(rowData.uuid || rowData.id);
    }
  };

  const handleStatusChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value as FilterType;
    setStatusType(value);
    setPage(0);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(0);
    refetch();
  };

  const handleView = (rowData: any) => {
    setIsViewMode(true);
    setSelectedUser(rowData);
  };

  return (
    <>
      <Grid size={12} sx={{ px: 1 }} direction="column">
        <Grid mb={1.5}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid>
              <Typography variant="titleBold4" color="Primary.main">
                {settingConstants.USERS}
              </Typography>
            </Grid>

            <Grid>
              <Grid container alignItems="center" spacing={2}>
                <Grid container spacing={2} display={'flex'}>
                  <Grid size={{ xs: 12, md: 6 }} mt={2.7}>
                    <CustomInput
                      placeholder={settingConstants.SEARCH_USER}
                      value={searchText}
                      onChange={handleSearch}
                      bgWhite
                      showIcon={<SearchIcon />}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <CustomLabel label="Status" />
                    <CustomSelect
                      placeholder={settingConstants.STATUS}
                      value={statusType}
                      items={STATUS_OPTIONS}
                      onChange={handleStatusChange}
                      backgroundColor="white"
                    />
                  </Grid>
                </Grid>

                <Grid mt={2.5}>
                  <CustomButton
                    variant="filled"
                    startIcon={<AddIcon />}
                    onClick={handleAddUser}
                    label={settingConstants.ADD_USER}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid>
          <CustomisedTable
            headCells={adminSettingsUsersHeader}
            tableData={DisplayAdminUsersDataTable || []}
            setHeight="73vh"
            removeRadius={false}
            onActionItemSelect={handleTableAction}
            handleEdit={handleEdit}
            handleView={handleView}
            handleArchive={handleArchive}
            handleUpdateStatus={handleUpdateStatus}
            showPagination
            totalCount={(filteredUserData?.data?.page as any)?.totalElements || 0}
            currentPage={page + 1}
            itemsPerPage={pageSize}
            onPageChange={newPage => setPage(newPage - 1)}
            onItemsPerPageChange={handlePageSizeChange}
            handleResend={handleResend}
          />
        </Grid>

        <Grid>
          <CustomDrawer
            title={isEditMode ? settingConstants.EDIT_USER : settingConstants.ADD_USER}
            anchor="right"
            open={openAddUserDialog}
            onClose={() => {
              setOpenAddUserDialog(false);
              setSelectedUser(null);
              setIsEditMode(false);
            }}
            drawerPadding="18px"
          >
            <AdminUserForm
              onClose={() => {
                setOpenAddUserDialog(false);
                setSelectedUser(null);
                setIsEditMode(false);
              }}
              RefetchUserData={RefetchUserData}
              isEdit={isEditMode}
              uuid={selectedUser?.uuid || ''}
              userData={isEditMode ? selectedUser?.data : undefined}
            />
          </CustomDrawer>
        </Grid>

        <Grid>
          <CustomDrawer
            title={settingConstants.VIEW_USER_DETAILS}
            anchor="right"
            open={isViewMode}
            onClose={() => {
              setIsViewMode(false);
              setSelectedUser(null);
              setIsEditMode(false);
            }}
            drawerWidth="50vw"
            drawerPadding="18px"
          >
            {selectedUser && <ViewUserDetails dataView={selectedUser} />}
          </CustomDrawer>
        </Grid>

        <ConfirmationPopUp
          open={isArchiveConfirmOpen}
          onClose={handleCancelArchive}
          onConfirm={handleConfirmArchive}
          message={`Are you sure you want to ${userToArchive?.archive ? 'restore' : 'archive'} the user "${userToArchive?.firstName} ${userToArchive?.lastName}"?`}
        />

        <ConfirmationPopUp
          open={isResendConfirmOpen}
          onClose={handleCancelResend}
          onConfirm={handleConfirmResend}
          message={`Are you sure you want to resend the invitation email to "${userToResend?.firstName} ${userToResend?.lastName}"?`}
        />
      </Grid>
    </>
  );
};

export default AdminUsers;
