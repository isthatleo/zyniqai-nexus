import PhoneInput from 'react-phone-number-input/input';
import { Phone } from 'lucide-react';
import 'react-phone-number-input/style.css';

interface PhoneInputProps {
  value?: string;
  onChange: (value: string | undefined) => void;
  placeholder?: string;
  className?: string;
}

export const PhoneInputComponent = ({ value, onChange, placeholder = '+1 (555) 000 0000', className = '' }: PhoneInputProps) => {
  return (
    <div className={`relative ${className}`}>
      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4 pointer-events-none" />
      <PhoneInput
        className="w-full pl-10 pr-4 py-3 rounded-xl bg-muted/50 border border-border/50 text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:shadow-[0_0_15px_hsl(var(--primary)/0.1)] transition-all"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        countrySelectProps={{ unicodeFlags: true }}
      />
    </div>
  );
};


