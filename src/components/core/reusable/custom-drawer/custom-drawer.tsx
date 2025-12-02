import { CloseIcon } from '../../../../assets/icons/closeIcon';
import { Box, Drawer, Grid, IconButton, Typography } from '@mui/material';
import { gridHeader } from './widgets/drawer-ts-widget';
import CustomButton from '../custom-button/custom-button';
// import { theme } from "src/utils/theme";
interface DrawerProps {
  anchor: 'left' | 'top' | 'right' | 'bottom';
  open: boolean;
  title: string;
  drawerWidth?: string;
  drawerPadding?: string;
  onClose: () => void;
  headerStyle?: string;
  isSaveBtnReq?: string;
  onClick?: () => void;
  showDatePicker?: boolean; 
  buttons?: Array<{
    label: string;
    variant?: "filled" | "outlined";
    onClick: () => void;
  }>;
}

const CustomDrawer = (props: React.PropsWithChildren<DrawerProps>) => {
  const { drawerWidth, drawerPadding, showDatePicker, buttons } = props;

  return (
    <Drawer anchor={props.anchor} open={props.open} onClose={props.onClose}>
      <Grid container flexDirection={'column'} height={'100%'} flexWrap={'nowrap'}>
        <Grid container alignItems="center" sx={gridHeader} mt={props.headerStyle}>
          <Grid>
            <Typography variant="titleBold4" color="Primary.main">
              {props.title}
            </Typography>
          </Grid>
          {showDatePicker && ( // Conditionally render DatePickerField
            <Grid marginTop={'8px'} marginRight={-30}>
              <Box>
                {/* <DatePickerField
                  useCustomStyle
                  bgWhite
                  label="Choose Date"
                  value={selectedDate ? dayjs(selectedDate) : null}
                  onChange={(selectedValue) => {
                    setSelectedDate(selectedValue);
                  }}
                  hasError={false}
                  errorMessage=""
                /> */}
              </Box>
            </Grid>
          )}
          <Grid>
            <IconButton onClick={props.onClose}>
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Grid
          mt={2}
          flex={1}
          sx={{
            width: drawerWidth ? drawerWidth : '45vw',
            paddingX: drawerPadding ? drawerPadding : '12px',
            overflowY: 'scroll',
            overflowX: 'hidden',
          }}
        >
          {props.children}
        </Grid>
      </Grid>

      {buttons && buttons.length > 0 && (
        <Grid
          style={{
            borderTop: "1px solid #E0E0E0",
            backgroundColor: "white",
            zIndex: 1000,
            display: "flex",
            gap: "10px",
            padding: "8px 10px",
            position: "sticky",
            bottom: 0,
            justifyContent: "flex-end",
          }}
        >
          {buttons.map((btn, idx) => (
            <CustomButton
              key={idx}
              label={btn.label}
              variant={btn.variant || "filled"}
              onClick={btn.onClick}
            />
          ))}
        </Grid>
      )}
    </Drawer>
  );
};

export default CustomDrawer;
