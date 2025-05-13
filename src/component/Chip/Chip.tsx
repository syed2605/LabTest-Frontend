import React from 'react';
import { Chip, Box } from '@mui/material';
import type { StatusDropdown } from '../../interfaces/CommonInterface';

export interface Option {
  label: string;
  value: string;
}

interface MultiChipProps {
  options: Option[] | StatusDropdown[] | undefined;
  selectedOptions: Option[];
  setSelectedOptions: (options: Option[]) => void;
}

const MultiChip: React.FC<MultiChipProps> = ({
  options,
  selectedOptions,
  setSelectedOptions,
}) => {
  const handleToggle = (option: Option) => {
    const updatedOptions: Option[] = selectedOptions.includes(option)
      ? selectedOptions.filter((item) => item !== option)
      : [...selectedOptions, option];
    setSelectedOptions(updatedOptions);
  };

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
      {options?.map((option: Option) => (
        <Chip
          key={option?.value ?? option}
          label={option?.label ?? option}
          clickable
          onClick={() => handleToggle(option)}
          color={selectedOptions?.includes(option) ? 'primary' : 'default'}
        />
      ))}
    </Box>
  );
};

export default MultiChip;
