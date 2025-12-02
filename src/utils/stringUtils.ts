export const getCountAndFormat = (
  roles: string[] | Record<string, string> | any
): { formattedRoles: string; count: number } => {
  if (!roles) {
    return { formattedRoles: '', count: 0 };
  }

  let rolesArray: string[] = [];

  // Handle different input types
  if (Array.isArray(roles)) {
    rolesArray = roles.filter(role => role);
  } else if (typeof roles === 'object') {
    // Handle object format like specialities object
    rolesArray = Object.values(roles).filter(role => role) as string[];
  } else {
    return { formattedRoles: '', count: 0 };
  }

  if (rolesArray.length === 0) {
    return { formattedRoles: '', count: 0 };
  }

  const formattedAndTrimmedRoles = rolesArray.map(role =>
      role
        .trim()
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ')
    );

  if (formattedAndTrimmedRoles.length === 0) {
    return { formattedRoles: '', count: rolesArray.length };
  }

  let displayRoles = '';
  if (formattedAndTrimmedRoles.length === 1) {
    displayRoles = formattedAndTrimmedRoles[0];
  } else if (formattedAndTrimmedRoles.length === 2) {
    displayRoles = `${formattedAndTrimmedRoles[0]}, ${formattedAndTrimmedRoles[1]}`;
  } else if (formattedAndTrimmedRoles.length === 3) {
    displayRoles = `${formattedAndTrimmedRoles[0]}, ${formattedAndTrimmedRoles[1]}, ${formattedAndTrimmedRoles[2]}`;
  } else {
    // Show first 3 specialities + count for remaining
    displayRoles = `${formattedAndTrimmedRoles[0]}, ${formattedAndTrimmedRoles[1]}, ${formattedAndTrimmedRoles[2]} (+${formattedAndTrimmedRoles.length - 3})`;
  }

  return { formattedRoles: displayRoles, count: rolesArray.length };
};

// Helper function to calculate age from date of birth
export const calculateAge = (dob: string): number => {
  if (!dob) return 0;
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
};

export const capitalizeFirstLetter = (value: string): string => {
  if (!value) return "";

  return value
    .split(",") // split by comma
    .map((role) =>
      role
        .trim() // remove extra spaces
        .split("_") // handle underscores
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ")
    )
    .join(", "); // join back with comma + space
};