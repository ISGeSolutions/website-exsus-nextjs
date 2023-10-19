// facebookPixel.js
import ReactPixel from 'react-facebook-pixel';

ReactPixel.init('YOUR_PIXEL_ID', {
  autoConfig: true, // Automatic configuration based on Pixel ID
  debug: false, // Set to true for development/debugging
});

export default ReactPixel;
