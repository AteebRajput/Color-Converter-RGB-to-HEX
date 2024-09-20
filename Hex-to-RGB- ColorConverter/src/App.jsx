import { useEffect, useState } from 'react';
import './App.css';

const App = () => {
  const [rgb, setRgb] = useState({ r: 232, g: 62, b: 62 });
  const [hex, setHex] = useState('#E73E3E');
  const [isRgbChange, setIsRgbChange] = useState(false);
  const [isHexChange, setIsHexChange] = useState(false);

  // Update hex when rgb changes (only if not triggered by hex change)
  useEffect(() => {
    if (isRgbChange) {
      const newHex = rgbtoHex(rgb.r, rgb.g, rgb.b);
      setHex(newHex);
      setIsRgbChange(false); // Reset the flag after updating
    }
  }, [rgb]);

  // Update rgb when hex changes (only if not triggered by rgb change)
  useEffect(() => {
    if (isHexChange) {
      const newRgb = hexToRgb(hex);
      setRgb(newRgb);
      setIsHexChange(false); // Reset the flag after updating
    }
  }, [hex]);

  const handleRgbChange = (e) => {
    const { name, value } = e.target;

    // Remove leading zeros and clamp between 0 and 255
    const cleanValue = value === '' ? '' : Math.min(Math.max(Number(value), 0), 255);

    setRgb({ ...rgb, [name]: cleanValue });
    setIsRgbChange(true); // Set flag to indicate RGB change
  };

  const handleHexChange = (e) => {
    setHex(e.target.value);
    setIsHexChange(true); // Set flag to indicate HEX change
  };

  const rgbtoHex = (r, g, b) => {
    const checkValid = (value) => Math.max(0, Math.min(255, value));
    const red = checkValid(r).toString(16).padStart(2, '0');
    const green = checkValid(g).toString(16).padStart(2, '0');
    const blue = checkValid(b).toString(16).padStart(2, '0');
    return `#${red}${green}${blue}`;
  };

  const hexToRgb = (hex) => {
    hex = hex.replace('#', '');
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    return { r, g, b };
  };

  return (
    <>
      <div className="app">
        <div className="converter">
          <h1 style={{ color: hex }}>Color Converter</h1>
          <div className="rgb-section">
            <h2 style={{ color: hex }}>RGB</h2>
            <div className="input-groups">
              <div className="input-group">
                <label htmlFor="r" style={{ color: hex }}>R:</label>
                <input
                  type="number"
                  name="r"
                  min="0"
                  max="255"
                  value={rgb.r}
                  onChange={handleRgbChange}
                />
              </div>
              <div className="input-group">
                <label htmlFor="g" style={{ color: hex }}>G:</label>
                <input
                  type="number"
                  name="g"
                  min="0"
                  max="255"
                  value={rgb.g}
                  onChange={handleRgbChange}
                />
              </div>
              <div className="input-group">
                <label htmlFor="b" style={{ color: hex }}>B:</label>
                <input
                  type="number"
                  name="b"
                  min="0"
                  max="255"
                  value={rgb.b}
                  onChange={handleRgbChange}
                />
              </div>
            </div>
          </div>
          <div className="hex-section">
            <h2 style={{ color: hex }}>HEX:</h2>
            <input
              type="text"
              maxLength="7"
              value={hex}
              onChange={handleHexChange}
            />
          </div>
        </div>
        <div className="preview" style={{ backgroundColor: hex }}></div>
      </div>
    </>
  );
};

export default App;
