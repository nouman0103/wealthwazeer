import {
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from "@mui/material";

export const SelectField = ({
  label,
  value,
  onChange,
  options,
  valuefield = "value",
  labelfield = "label",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options?: any[];
  labelfield?: string;
  valuefield?: string;
}) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="categorySelectLabel">{label}</InputLabel>
      <Select
        labelId="categorySelectLabel"
        label={label}
        className="w-full"
        placeholder={"Select " + { label }}
        MenuProps={{
          classes: {
            paper: "bg-transparent",
            list: "backdrop-blur-lg bg-glassmorphic-gradient rounded-3xl border border-opacity-5 border-white shadow-glassmorphic",
          },
          PaperProps: {
            style: {
              backgroundColor: "transparent",
              backgroundImage: "none",
              borderRadius: 20,
            },
          },
        }}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {options?.map((option, index) => (
          <MenuItem key={index} value={option[valuefield]}>
            {option[labelfield]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
