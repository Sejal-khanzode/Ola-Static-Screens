import { useState } from 'react';
import { Button, Menu, MenuItem, Box, Typography } from '@mui/material';
import { StatusEnum, statusLabels, getColorByType } from '../../../../models/chip';
import { DropDown, DropUp } from '../../../../assets/icons/dropIcons';

interface CustomChipDropdownProps {
  value?: string;
  items: { label: string; value: string }[];
  onChange?: (value: string) => void;
}

const CustomChipDropdown = ({ value, items, onChange }: CustomChipDropdownProps) => {
  const [dropdown, setDropdown] = useState<null | HTMLElement>(null);
  const [selectedValue, setSelectedValue] = useState(value || items[0]?.value || '');
  const open = Boolean(dropdown);

  const selectedLabel = statusLabels[selectedValue as keyof typeof statusLabels] || selectedValue;
  const selectedColor = getColorByType(selectedValue as StatusEnum);

  const handleToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (open) {
      setDropdown(null);
    } else {
      setDropdown(event.currentTarget);
    }
  };

  const handleClose = () => {
    setDropdown(null);
  };

  const handleSelect = (newValue: string) => {
    setSelectedValue(newValue);
    onChange?.(newValue);
    handleClose();
  };

  return (
    <>
      <Button
        id="chip-dropdown-btn"
        onClick={handleToggle}
        variant="outlined"
        endIcon={open ? <DropUp color={selectedColor} /> : <DropDown color={selectedColor} />}
        sx={{
          px: 2,
          py: 1,
          width:'150px',
          borderRadius: 4,
          border: `1px solid ${selectedColor}`,
          color: selectedColor,
          gap: 1,
        }}
      >
        <Typography variant="bodyMedium4" sx={{ whiteSpace: 'nowrap' }}>
          {selectedLabel}
        </Typography>
      </Button>

      <Menu anchorEl={dropdown} open={open} onClose={handleClose}>
        {items.map(item => {
          const isSelected = selectedValue === item.value;

          return (
            <MenuItem key={item.value} onClick={() => handleSelect(item.value)}>
              <Box
                sx={{
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 4,
                  display: 'inline-flex',
                  alignItems: 'center',
                  color: isSelected ? 'Neutral.60' : undefined,
                  backgroundColor: isSelected ? 'transparent' : undefined,
                }}
              >
                <Typography variant="bodyMedium4">{item.label}</Typography>
              </Box>
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
};

export default CustomChipDropdown;
