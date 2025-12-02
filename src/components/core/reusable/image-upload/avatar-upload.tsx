import { Avatar, IconButton } from '@mui/material';
import { CloseIcon } from 'src/assets/icons/closeIcon';
import { useState, useEffect, useRef } from 'react';
import { useAppDispatch } from 'src/redux/hooks';
import { setSnackbarOn } from 'src/redux/actions/snackbar-actions';
import { AlertSeverity } from '../snackbar-alert/snackbar-alert';
import { APIFeedbackMessages } from 'src/constants/formConst';

interface AvatarUploadProps {
  initialImage?: string;
  onImageChange?: (file: File | null) => void;
  size?: number;
  disabled?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  onDeleteImage?: () => void;
}

const AvatarUpload: React.FC<AvatarUploadProps> = ({
  initialImage,
  onImageChange,
  size = 150,
  disabled = false,
  value,
  onChange,
  onBlur,
  onDeleteImage,
}) => {
  const [previewUrl, setPreviewUrl] = useState<string>(value || initialImage || '');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (value !== undefined) {
      setPreviewUrl(value);
    }
  }, [value]);

  const handleImageClick = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const maxSizeInBytes = 1 * 1024 * 1024;
      if (file.size > maxSizeInBytes) {
        dispatch(
          setSnackbarOn({
            severity: AlertSeverity.ERROR,
            message: APIFeedbackMessages.IMAGE_SIZE_ERROR,
          })
        );
        event.target.value = '';
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Url = reader.result as string;
        setPreviewUrl(base64Url);
        onChange?.(base64Url);
        onImageChange?.(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    setPreviewUrl('');
    onChange?.('');
    onImageChange?.(null);
    onDeleteImage?.();
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <Avatar
        src={previewUrl}
        sx={{
          width: size,
          height: size,
          bgcolor: '#f5f5f5',
          color: '#757575',
          cursor: disabled ? 'default' : 'pointer',
        }}
        onClick={handleImageClick}
        onBlur={onBlur}
      />

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageChange}
        accept="image/*"
        style={{ display: 'none' }}
        disabled={disabled}
      />

      {previewUrl && (
        <IconButton
          onClick={handleImageRemove}
          size="small"
          sx={{
            position: 'absolute',
            top: 4,
            right: 4,
            backgroundColor: 'Base.white',
            '&:hover': { backgroundColor: 'Base.white' },
            boxShadow: 1,
          }}
        >
          <CloseIcon color="Primary.main" />
        </IconButton>
      )}
    </div>
  );
};

export default AvatarUpload;
