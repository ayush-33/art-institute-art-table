import { useRef } from 'react';
import { OverlayPanel as PrimeOverlayPanel } from 'primereact/overlaypanel';
import { Button } from 'primereact/button';

// tell TS this is a JSX component
const OverlayPanel = PrimeOverlayPanel as unknown as React.FC<any>;

interface Props {
  selectCount: number | null;
  setSelectCount: (val: number | null) => void;
}

const SelectOverlay = ({ selectCount, setSelectCount }: Props) => {
  const overlayRef = useRef<any>(null);

  return (
    <div style={{ marginBottom: 10 }}>
      <Button
        label="Custom Select"
        onClick={(e) => overlayRef.current?.toggle(e)}
        style={{ marginRight: 10 }}
      />

      <OverlayPanel ref={overlayRef}>
        <div>
          <input
            type="number"
            placeholder="Select N rows"
            value={selectCount ?? ''}
            onChange={(e) => {
              const val = Number(e.target.value);
              setSelectCount(val > 0 ? val : null);
            }}
          />
        </div>
      </OverlayPanel>
    </div>
  );
};

export default SelectOverlay;
