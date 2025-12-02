import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import CustomisedTable from 'src/components/core/reusable/custom-table/custom-table';
import { macrosHeader } from 'src/components/core/reusable/headers/all-headers';
import { useTextMacroControllerServiceGetApiMasterTextMacro } from 'src/sdk/queries';
import { useDispatch } from 'react-redux';
import { hideLoader, showLoader } from 'src/redux/reducers/loaderReducer';
import { TextMacro, TextMacroControllerService } from 'src/sdk/requests';
import CustomDrawer from 'src/components/core/reusable/custom-drawer/custom-drawer';
import CustomDialog from 'src/components/core/reusable/custom-dialog/custom-dialog';
import AddEditMacros from './AddEditMacros';
import ViewMacro from './ViewMacro';
import ConfirmationPopUp from 'src/components/core/reusable/confirmation-pop-up/confirmation-pop-up';
import { useTextMacroControllerServiceDeleteApiMasterTextMacroByTextMacroUuid } from 'src/sdk/queries';
import useApiFeedback from 'src/hooks/useApiFeedback';
import { MacrosEnum } from 'src/constants/formConst';

// Global state for macro search
let globalRefetchMacrosFunction: (() => void) | null = null;
let globalMacroSearchString: string = '';

export const setGlobalRefetchMacrosFunction = (refetchFn: () => void) => {
  globalRefetchMacrosFunction = refetchFn;
};

export const getGlobalRefetchMacrosFunction = () => globalRefetchMacrosFunction;

export const setGlobalMacroSearchString = (search: string) => {
  globalMacroSearchString = search;
};

export const getGlobalMacroSearchString = () => globalMacroSearchString;

const MacrosSetting = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(15);
  const [isMacrosDrawerOpen, setIsMacrosDrawerOpen] = useState<boolean>(false);
  const [selectedMacroData, setSelectedMacroData] = useState<TextMacro | null>(null);
  const [isCloneDialogOpen, setIsCloneDialogOpen] = useState<boolean>(false);
  const [cloneMacroData, setCloneMacroData] = useState<TextMacro | null>(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState<boolean>(false);
  const [macroToDelete, setMacroToDelete] = useState<TextMacro | null>(null);
  const [isViewDrawerOpen, setIsViewDrawerOpen] = useState<boolean>(false);
  const [macroToView, setMacroToView] = useState<TextMacro | null>(null);
  const dispatch = useDispatch();


  const {
    data: apiData,
    isLoading,
    refetch: refetchMacroData,
  } = useTextMacroControllerServiceGetApiMasterTextMacro({
    page,
    size: pageSize,
    title: getGlobalMacroSearchString(),
  });

  const {
    mutateAsync: deleteMacroAsync,
    isPending: isDeleting,
    isSuccess: isDeleteSuccess,
    isError: isDeleteError,
    error: deleteError,
    data: deleteData,
  } = useTextMacroControllerServiceDeleteApiMasterTextMacroByTextMacroUuid();

  const medicalCodeData = apiData?.data?.content || [];

  const tableData = Array.isArray(medicalCodeData)
    ? medicalCodeData?.map((medical: any) => ({
        ...medical,
        title: medical?.title,
        expansionText: medical?.expansionText,
        uuid: medical?.uuid,
        action: medical.archive
          ? [{ label: 'Restore', route: 'restore' }]
          : [
              { label: 'Edit', route: 'edit' },
              { label: 'Delete', route: 'delete' },
              { label: 'Clone', route: 'clone' },
            ],
      }))
    : [];

  const handlePageChange = (value: number) => {
    const newPage = value - 1;
    setPage(newPage);

    TextMacroControllerService.getApiMasterTextMacro({
      page: newPage,
      size: pageSize,
      title: getGlobalMacroSearchString(),
    });
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(0);

    TextMacroControllerService.getApiMasterTextMacro({
      page: 0,
      size: newPageSize,
      title: getGlobalMacroSearchString(),
    });
  };

  const handleEdit = (rowData: TextMacro) => {
    setSelectedMacroData(rowData);
    setIsMacrosDrawerOpen(true);
  };

  const handleDelete = (rowData: TextMacro) => {
    setMacroToDelete(rowData);
    setIsDeleteConfirmOpen(true);
  };

  const handleClone = (rowData: TextMacro) => {
    const clonedMacroData: TextMacro = {
      ...rowData,
      title: `${rowData.title} - copy`,
      uuid: undefined,
    };
    setCloneMacroData(clonedMacroData);
    setIsCloneDialogOpen(true);
  };

  const handleView = (rowData: TextMacro) => {
    setMacroToView(rowData);
    setIsViewDrawerOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (macroToDelete?.uuid) {
      try {
        await deleteMacroAsync({ textMacroUuid: macroToDelete.uuid });
        setIsDeleteConfirmOpen(false);
        setMacroToDelete(null);
        refetchMacroData();
      } catch (error) {
        console.error('Error deleting macro:', error);
      }
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteConfirmOpen(false);
    setMacroToDelete(null);
  };

  useApiFeedback(
    isDeleteError,
    deleteError,
    isDeleteSuccess,
    (deleteData?.message || 'Macro deleted successfully') as string
  );

  useEffect(() => {
    if (isLoading || isDeleting) {
      dispatch(showLoader());
    } else {
      dispatch(hideLoader());
    }
  }, [isLoading, isDeleting, dispatch]);

  useEffect(() => {
    setGlobalRefetchMacrosFunction(() => {
      refetchMacroData();
    });
    return () => {
      setGlobalRefetchMacrosFunction(() => {});
    };
  }, [refetchMacroData]);


  return (
    <>
      <Box pt={1}>
        <CustomisedTable
          headCells={macrosHeader}
          tableData={tableData}
          setHeight="73vh"
          removeRadius={false}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          showPagination
          totalCount={(apiData?.data?.page as any)?.totalElements || 0}
          currentPage={page + 1}
          itemsPerPage={pageSize}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handlePageSizeChange}
          handleClone={handleClone}
          handleView={handleView}
        />
      </Box>

      <CustomDrawer
        open={isMacrosDrawerOpen}
        onClose={() => {
          setIsMacrosDrawerOpen(false);
          setSelectedMacroData(null);
        }}
        anchor="right"
        drawerWidth="40vw"
        title={selectedMacroData?.uuid ? MacrosEnum.EDIT_MACRO : MacrosEnum.ADD_NEW_MACRO}
      >
        <AddEditMacros
          onClose={() => {
            setIsMacrosDrawerOpen(false);
            setSelectedMacroData(null);
          }}
          ReftechData={refetchMacroData}
          initialData={selectedMacroData || undefined}
          isEdit={!!selectedMacroData?.uuid}
        />
      </CustomDrawer>

      <CustomDialog
        open={isCloneDialogOpen}
        onClose={() => {
          setIsCloneDialogOpen(false);
          setCloneMacroData(null);
        }}
        title={MacrosEnum.CLONE_MACRO}
        buttonName={[]}
        width="600px"
        height="auto"
      >
        <AddEditMacros
          onClose={() => {
            setIsCloneDialogOpen(false);
            setCloneMacroData(null);
          }}
          ReftechData={refetchMacroData}
          initialData={cloneMacroData || undefined}
          isEdit={false}
        />
      </CustomDialog>

      <CustomDrawer
        open={isViewDrawerOpen}
        onClose={() => {
          setIsViewDrawerOpen(false);
          setMacroToView(null);
        }}
        anchor="right"
        drawerWidth="40vw"
        title={MacrosEnum.VIEW_MACRO}
      >
        {macroToView && (
          <ViewMacro
            onClose={() => {
              setIsViewDrawerOpen(false);
              setMacroToView(null);
            }}
            macroData={macroToView}
          />
        )}
      </CustomDrawer>

      <ConfirmationPopUp
        open={isDeleteConfirmOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        message={`Are you sure you want to delete the macro "${macroToDelete?.title}"?`}
      />
    </>
  );
};

export default MacrosSetting;
