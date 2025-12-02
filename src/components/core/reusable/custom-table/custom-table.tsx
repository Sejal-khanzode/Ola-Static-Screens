import { useState, useEffect } from 'react';
import {
  Avatar,
  Box,
  Checkbox,
  Tooltip,
  TableBody,
  Typography,
  Button,
  Select,
  MenuItem,
  IconButton,
  Grid,
  Divider,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { commonComponentConstant } from '../../../../constants/common-component';
import {
  tableBodyStyles,
  tableBorder,
  tableHeadStyles,
  patientNameStyles,
  actionStyles,
} from './widgets/tablestyles';
import IntakeForm from '../intake-form/intake-form';
import { IntakeFormStatus } from '../intake-form/intake-form-icon';
import { chipStyle } from '../chip/widgets/chipStyles';
import Chip from '../chip/chip';
import { getBackgroundByType, getColorByType, statusLabels } from '../../../../models/chip';
import { ViewMode } from '../../../../models/apiStatus';
import CustomChipSelect from '../custom-chip-select/custom-chip-select';
import ActionButton from '../action-button/action-button';
import Insurance from '../insurance/insurance';
import { InsuranceStatus } from '../insurance/insurance-icon';
import { EditIcon } from '../../../../assets/icons/editIcon';
import Status, { StatusType } from '../active-status/active-status';
import CustomButton from '../custom-button/custom-button';
import { Header } from '../headers/all-headers';

interface TableRowData {
  [key: string]: any;
  archive?: boolean;
  style?: React.CSSProperties;
  descriptionStyle?: React.CSSProperties;
}

interface EnhancedTableProps {
  rowCount: number;
  headCells: Header[];
  vital?: boolean;
}

interface CustomisedTableProps<Data> {
  page?: number;
  headCells: Header[];
  tableData: Data[];
  setPage?: (value: number) => void;
  setHeight?: string;
  removeRadius?: boolean;
  noRecordsMsg?: string;
  showPagination?: boolean;
  pageSize?: number;
  onActionItemSelect?: (item: string, row: Data) => void;
  handleView?: (rowData: Data) => void;
  patientName?: string;
  handleNavigate?: (rowData: Data) => void;
  showCPTAndICDPagination?: boolean;
  pageDisplaySize?: number | string;
  setPageDisplaySize?: (page: number) => void;
  handleOpenModal?: (rowData: any) => void;
  handleCancel?: (rowData: any) => void;
  handleReschedule?: (rowData: any) => void;
  handleStartAppt?: (rowData: any) => void;
  onStatusChange?: (rowData: Data, newStatus: string) => void;
  handleViewClinicalNotes?: (rowData: any) => void;
  handleDelete?: (rowData: any, type: string) => void;
  handleOpenDrawer?: (rowData: any) => void;
  onActionClick?: (rowData: any) => void;
  selectedCheckBoxVal?: string[];
  handleCheckBoxSelect?: (uuid: string) => void;
  handleEdit?: (rowData: any) => void;
  handleArchive?: (rowData: any) => void;
  handleUpdateStatus?: (rowData: any) => void;
  handleClone?: (rowData: any) => void;
  totalCount?: number;
  currentPage?: number;
  itemsPerPage?: number;
  onPageChange?: (page: number) => void;
  onItemsPerPageChange?: (itemsPerPage: number) => void;
  onWarningIconClick?: (event: React.MouseEvent<HTMLElement>, rowData: any) => void;
  handleResend?: (rowData: any) => void;
  handleAssign?: (rowData: any) => void;
  handleStripe?: (rowData: any) => void;
  handleChangeStatus?: (rowData: any) => void;
  handleRestore?: (rowData: any) => void;
  hideBgColorPagination?: boolean;
  handleSetAsPrimary?: (rowData: any) => void;
}

export const EnhancedTableHead = (props: EnhancedTableProps) => {
  const { headCells, vital } = props;

  return (
    <TableHead>
      <TableRow
        sx={{
          background: '#E9E9E9',
        }}
      >
        {headCells?.map(headCell => (
          <TableCell
            padding="none"
            sx={{
              ...tableHeadStyles,
              padding: '10px 18px',
              textTransform: 'none',
              position: 'sticky',
              top: 0,
              zIndex: 1,
              background: '#E9E9E9',
              ...(vital && {
                width: '100px',
              }),
              ...(vital && {
                width: '100px',
              }),
            }}
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
          >
            <Typography variant="bodyMedium4"> {headCell.label}</Typography>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

// Enhanced pagination with "Rows per page" and numbered pagination
const EnhancedPagination = ({
  totalCount,
  currentPage,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
  hideBgColorPagination,
}: {
  totalCount: number;
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
  hideBgColorPagination?: boolean;
}) => {
  const totalPages = Math.ceil(totalCount / itemsPerPage);
  // Generate page numbers to show
  const getPageNumbers = () => {
    const pages = [];

    // For small datasets (5 or fewer pages), show all pages
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage <= 3) {
        // If current page is near the beginning (1-3), show pages 2-4
        for (let i = 2; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // If current page is near the end, show last 4 pages
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // If current page is in the middle, show current page with adjacent pages
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        // mt: 1,
        backgroundColor: hideBgColorPagination ? 'initial' : '#f5f5f5',
        padding: '8px 16px',
        borderRadius: '4px',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography variant="body2" color="textSecondary">
          Rows per page:
        </Typography>
        <Select
          value={itemsPerPage || 15}
          onChange={e => {
            const newPageSize = Number(e.target.value);
            onItemsPerPageChange(newPageSize);
          }}
          size="small"
          sx={{ minWidth: 60 }}
          displayEmpty={false}
        >
          <MenuItem value={15}>15</MenuItem>
          <MenuItem value={25}>25</MenuItem>
          <MenuItem value={50}>50</MenuItem>
          <MenuItem value={100}>100</MenuItem>
        </Select>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Button
          variant="outlined"
          size="small"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          sx={{ minWidth: 40, height: 32 }}
        >
          ←
        </Button>

        {getPageNumbers().map((page, index) => (
          <Button
            key={index}
            variant={page === currentPage ? 'contained' : 'outlined'}
            size="small"
            onClick={() => typeof page === 'number' && onPageChange(page)}
            disabled={page === '...'}
            sx={{
              minWidth: 32,
              height: 32,
              backgroundColor: page === currentPage ? '#d5e3f0' : 'white',
              color: page === currentPage ? 'black' : 'black',
              '&:hover': {
                backgroundColor: page === currentPage ? '#d5e3f0' : '#f5f5f5',
              },
            }}
          >
            {page}
          </Button>
        ))}

        <Button
          variant="outlined"
          size="small"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          sx={{ minWidth: 40, height: 32 }}
        >
          →
        </Button>
      </Box>
    </Box>
  );
};

function CustomisedTable<Data extends TableRowData>(props: CustomisedTableProps<Data>) {
  const {
    headCells,
    removeRadius,
    setHeight,
    tableData: initialTableData,
    noRecordsMsg,
    showPagination,
    handleView,
    handleNavigate,
    patientName,
    handleCancel,
    handleReschedule,
    handleStartAppt,
    handleViewClinicalNotes,
    handleDelete,
    handleOpenDrawer,
    onActionClick,
    selectedCheckBoxVal,
    handleCheckBoxSelect,
    handleEdit,
    handleArchive,
    handleUpdateStatus,
    handleClone,
    totalCount,
    currentPage,
    itemsPerPage,
    onPageChange,
    onItemsPerPageChange,
    onWarningIconClick,
    handleResend,
    handleAssign,
    handleStripe,
    handleChangeStatus,
    hideBgColorPagination,
    handleSetAsPrimary,
  } = props;
  const {
    NO_RECORDS_FOUND,
    //  NEXT, PREV
  } = commonComponentConstant;
  const [tableData, setTableData] = useState<Data[]>(initialTableData);

  useEffect(() => {
    setTableData(initialTableData);
  }, [initialTableData]);

  const handleItemSelection = (
    selectedItem: {
      label: string;
      route: string;
      disabled?: boolean;
    },
    rowData: any
  ) => {
    if (selectedItem.label === 'Edit' || selectedItem.label === 'Edit Appointment') {
      if (rowData && handleEdit) {
        handleEdit(rowData);
      }
    } else if (selectedItem.label === 'Archive' || selectedItem.label === 'Restore') {
      if (rowData && handleArchive) {
        handleArchive(rowData);
      }
    } else if (
      selectedItem.label === ViewMode.EDIT ||
      selectedItem.label === ViewMode.OPEN_CHART ||
      selectedItem.label === 'Edit Appointment'
    ) {
      const selectedRow = rowData;
      if (selectedRow && handleOpenDrawer) {
        handleOpenDrawer(selectedRow);
      }
    } else if (selectedItem.label === ViewMode.VIEW) {
      const selectedRow = rowData;
      if (selectedRow && handleView) {
        handleView(selectedRow);
      }
    } else if (selectedItem.label === ViewMode.DELETE || selectedItem.label === ViewMode.RESTORE) {
      const selectedRow = rowData;
      if (selectedRow && handleDelete) {
        handleDelete(selectedRow, selectedItem.label);
      }
    } else if (selectedItem.label === ViewMode.RESCHEDULE) {
      handleReschedule && handleReschedule(rowData);
    } else if (selectedItem.label === ViewMode.START) {
      handleStartAppt && handleStartAppt(rowData);
    } else if (selectedItem.label === ViewMode.CANCEL) {
      handleCancel && handleCancel(rowData);
    } else if (selectedItem.label === 'Resend Invite') {
      if (rowData && handleResend) {
        handleResend(rowData);
      }
    } else if (selectedItem.label === 'Clone') {
      const selectedRow = rowData;
      if (selectedRow && handleClone) {
        handleClone(selectedRow);
      }
    } else if (selectedItem.label === 'Assign to Patient') {
      const selectedRow = rowData;
      if (selectedRow && handleAssign) {
        handleAssign(selectedRow);
      }
    } else if (selectedItem.label === 'Change Status') {
      if (rowData && handleChangeStatus) {
        handleChangeStatus(rowData);
      }
    } else if (selectedItem.label === 'Set as primary') {
      if (rowData && handleSetAsPrimary) {
        handleSetAsPrimary(rowData);
      }
    }
    {
      handleViewClinicalNotes && handleViewClinicalNotes(rowData);
    }
  };

  return (
    <Box width={'100%'}>
      <TableContainer
        sx={{
          ...tableBorder,
          borderRadius: !removeRadius ? 'var(--1, 8px)' : 'none',
          maxHeight: setHeight,
          overflowY: 'scroll',
        }}
      >
        <Table
          sx={{ minWidth: '100%', '&:hover': { backgroundColor: 'Primary.0' } }}
          aria-labelledby="tableTitle"
        >
          <EnhancedTableHead rowCount={tableData?.length ?? 0} headCells={headCells} />
          <TableBody>
            {tableData?.length > 0 &&
              tableData?.map((row, index) => {
                return (
                  <TableRow
                    onClick={() => handleNavigate && handleNavigate(row)}
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={index}
                    sx={{
                      opacity: row.archive ? '50%' : '100%',
                      background: 'white',
                      '&:hover': {
                        backgroundColor: 'Primary.0',
                      },
                      ...(row.style || {}),
                    }}
                  >
                    {headCells.map((cell, index) =>
                      cell.type === 'action' ? (
                        <TableCell sx={tableBodyStyles} align="left" key={index}>
                          <Typography sx={actionStyles} onClick={() => onActionClick?.(row)}>
                            {row[cell.id] || '-'}
                          </Typography>
                        </TableCell>
                      ) : cell.type === 'color' ? (
                        <TableCell sx={tableBodyStyles} align="left" key={index}>
                          <Box
                            sx={{
                              backgroundColor: `${row[cell.id]}`,
                              width: '48px',
                              height: '18px',
                              borderRadius: 0.5,
                            }}
                            onClick={() => onActionClick?.(row)}
                          ></Box>
                        </TableCell>
                      ) : cell.type === 'actionButton' ? (
                        <TableCell
                          sx={tableBodyStyles}
                          // align="start"
                          key={index}
                        >
                          <ActionButton
                            list={row[cell.id]}
                            onItemSelected={item => handleItemSelection(item, row)}
                          />
                        </TableCell>
                      ) : cell.type === 'customButton' ? (
                        <TableCell sx={tableBodyStyles} key={index}>
                          <CustomButton
                            label={row[cell.id]?.label}
                            variant={row[cell.id]?.variant}
                            startIcon={row[cell.id]?.startIcon}
                            onClick={row[cell.id]?.onClick}
                          />
                        </TableCell>
                      ) : cell.type === 'account' ? (
                        <TableCell sx={tableBodyStyles} key={index} onClick={handleStripe}>
                          {row.account === 'Sync' ? (
                            <Typography variant="bodyMedium4" color="#00AF35">
                              {row.account}
                            </Typography>
                          ) : (
                            <Typography
                              variant="bodyMedium4"
                              sx={{
                                cursor: 'pointer',
                                color: 'Primary.main',
                                borderBottom: '1px solid',
                              }}
                              onClick={() => handleStripe && handleStripe(row)}
                            >
                              {row.account}
                            </Typography>
                          )}
                        </TableCell>
                      ) : cell.type === 'activeStatus' ? (
                        <TableCell sx={tableBodyStyles} key={index}>
                          <Status
                            status={row.status}
                            type={StatusType.TOGGLE_BTN}
                            handleStatusChange={handleUpdateStatus}
                            editData={row}
                          />
                        </TableCell>
                      ) : cell.type === 'status' ? (
                        <TableCell sx={tableBodyStyles} key={index}>
                          <CustomChipSelect
                            items={[
                              { label: 'Scheduled', value: 'SCHEDULED' },
                              { label: 'Checked In', value: 'CHECKED_IN' },
                              { label: 'In Exam', value: 'IN_EXAM' },
                              { label: 'No Show', value: 'NO_SHOW' },
                              { label: 'Cancelled', value: 'CANCELLED' },
                            ]}
                            onChange={val => console.log('Selected:', val)}
                          />
                        </TableCell>
                      ) : cell.type === 'chip' ? (
                        <TableCell sx={tableBodyStyles} key={index}>
                          {row[cell.id] === 'CANCELLED' ? (
                            <Tooltip title={row['cancelReason']}>
                              <Box
                                sx={{
                                  ...chipStyle,
                                  background: getBackgroundByType(row[cell.id]),
                                  cursor: 'pointer',
                                }}
                                color={getColorByType(row[cell.id])}
                              >
                                <Typography variant="bodyRegular4">
                                  {statusLabels[row[cell.id] as keyof typeof statusLabels]}
                                </Typography>
                              </Box>
                            </Tooltip>
                          ) : (
                            <Chip type={row[cell.id]} />
                          )}
                        </TableCell>
                      ) : cell.type === 'card' ? (
                        <TableCell sx={tableBodyStyles} key={index}>
                          <Box display={'flex'} gap={1.5}>
                            <Typography variant="bodyMedium4">{row?.creditCard}</Typography>
                            <Chip type={row.default} />
                          </Box>
                        </TableCell>
                      ) : cell.type === 'edit' ? (
                        <TableCell sx={tableBodyStyles} key={index}>
                          <EditIcon onClick={() => handleEdit?.(row)} />
                        </TableCell>
                      ) : cell.type === 'checkbox' ? (
                        <TableCell sx={tableBodyStyles} key={index}>
                          {row[cell.id] === null ? null : (
                            <Box display="flex" alignItems="center" gap={1}>
                              <Checkbox
                                checked={selectedCheckBoxVal?.includes(row['uuid'])}
                                onClick={() =>
                                  handleCheckBoxSelect && handleCheckBoxSelect(row['uuid'] || '')
                                }
                                sx={{
                                  '& .MuiSvgIcon-root': { fontSize: 20 },
                                  padding: '0px',
                                }}
                              />
                              <Typography
                                sx={{
                                  ...tableBodyStyles,
                                  color: 'rgb(72, 108, 177)',
                                  cursor: 'pointer',
                                  padding: '8px 0px',
                                }}
                                // onClick={() => handleView(row)}
                              >
                                {row[cell.id]}
                              </Typography>
                            </Box>
                          )}
                        </TableCell>
                      ) : cell.type === 'intakeForm' ? (
                        <TableCell sx={tableBodyStyles} key={index}>
                          <IntakeForm
                            status={
                              (row[cell.id] && typeof row[cell.id] === 'string'
                                ? row[cell.id].toUpperCase()
                                : 'PENDING') as IntakeFormStatus
                            }
                          />
                        </TableCell>
                      ) : cell.type === 'stickyNote' ? (
                        <TableCell sx={tableBodyStyles} key={index}>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 1,
                              cursor: 'pointer',
                            }}
                            onClick={() => handleView && handleView(row)}
                          >
                            <Grid container>
                              <Grid size={12} sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography variant="bodyMedium4" color="Primary.main">
                                  {row.createdInfo || '-'}
                                </Typography>
                                <Divider
                                  orientation="vertical"
                                  flexItem
                                  sx={{ width: 10, mr: 1, color: 'Primary.main' }}
                                />
                                <Typography variant="bodyMedium4" color="Primary.main">
                                  {row.createdDate || '-'}
                                </Typography>
                                <Divider
                                  orientation="vertical"
                                  flexItem
                                  sx={{ width: 10, mr: 1, color: 'Primary.main' }}
                                />
                                <Typography variant="bodyMedium4" color="Primary.main">
                                  {row.createdTime || '-'}
                                </Typography>
                              </Grid>

                              <Grid size={12}>
                                <Typography variant="bodyMedium4" color="Neutral.70">
                                  {row.description || '-'}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Box>
                        </TableCell>
                      ) : cell.type === 'insurance' ? (
                        <TableCell sx={tableBodyStyles} key={index}>
                          <Insurance
                            insurance={
                              (row[cell.id] && typeof row[cell.id] === 'string'
                                ? row[cell.id].toUpperCase()
                                : 'COMPLETED') as InsuranceStatus
                            }
                          />
                        </TableCell>
                      ) : cell.type === 'patientName' ||
                        cell.id === patientName ||
                        cell.type === 'view' ? (
                        <TableCell
                          sx={patientNameStyles}
                          align="left"
                          key={index}
                          onClick={() => handleView && handleView(row)}
                        >
                          {cell.id === 'patientName' ? (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              {row.profileIcon && (
                                <Avatar
                                  src={row.profileIcon}
                                  alt={row.patientName}
                                  sx={{ width: 28, height: 28 }}
                                />
                              )}
                              <Typography variant="bodyMedium4">
                                {row.patientName || '-'}
                                {/* {row.gender && (
                                    ( {row.gender || '-'})
                                  )} */}
                              </Typography>
                            </Box>
                          ) : (
                            <Typography variant="bodyMedium4">{row[cell.id] || '-'}</Typography>
                          )}
                        </TableCell>
                      ) : cell.type === 'warning' ? (
                        <TableCell sx={tableBodyStyles} align="left" key={index}>
                          <Box display="flex" alignItems="center" gap={1}>
                            {row.failedRecords && row.failedRecords > 0 ? (
                              <IconButton
                                size="small"
                                onClick={event => {
                                  event.preventDefault();
                                  event.stopPropagation();
                                  if (
                                    onWarningIconClick &&
                                    typeof onWarningIconClick === 'function'
                                  ) {
                                    onWarningIconClick(event, row);
                                  }
                                }}
                                sx={{
                                  color: '#ff9800',
                                  padding: '4px',
                                  '&:hover': {
                                    backgroundColor: 'rgba(255, 152, 0, 0.1)',
                                  },
                                }}
                              >
                                <InfoIcon fontSize="small" />
                              </IconButton>
                            ) : (
                              ''
                            )}{' '}
                            <Typography>{row[cell.id] || '-'}</Typography>
                          </Box>
                        </TableCell>
                      ) : (
                        <TableCell sx={tableBodyStyles} align="left" key={index}>
                          {cell.id === 'description' && row.descriptionStyle ? (
                            <Typography sx={{ ...row.descriptionStyle }}>
                              {row[cell.id] || '-'}
                            </Typography>
                          ) : (
                            row[cell.id] || '-'
                          )}
                        </TableCell>
                      )
                    )}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      {(tableData?.length === 0 || !tableData) && (
        <Box display={'flex'} justifyContent={'center'} padding={2}>
          <Typography variant="bodyRegular4" sx={{ color: '#565656' }}>
            {noRecordsMsg || NO_RECORDS_FOUND}
          </Typography>
        </Box>
      )}

      {showPagination && (
        <EnhancedPagination
          totalCount={totalCount || 0}
          currentPage={currentPage || 1}
          itemsPerPage={itemsPerPage || 10}
          onPageChange={onPageChange || (() => {})}
          onItemsPerPageChange={onItemsPerPageChange || (() => {})}
          hideBgColorPagination={hideBgColorPagination}
        />
      )}
    </Box>
  );
}

export default CustomisedTable;
