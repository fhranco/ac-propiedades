const fs = require('fs');

const src1 = '/Users/patagoniacoach/.gemini/antigravity-ide/brain/5f6c246c-b9f6-4456-9a3a-a80610efdf0d/family_buying_property_1783247315270.png';
const dest1 = '/Users/patagoniacoach/.gemini/antigravity-ide/scratch/InmobiliariaACMagallanes/ACpropiedades/public/images/about/family_buying.png';

const src2 = '/Users/patagoniacoach/.gemini/antigravity-ide/brain/5f6c246c-b9f6-4456-9a3a-a80610efdf0d/family_selling_property_1783247326356.png';
const dest2 = '/Users/patagoniacoach/.gemini/antigravity-ide/scratch/InmobiliariaACMagallanes/ACpropiedades/public/images/about/family_selling.png';

try {
  fs.copyFileSync(src1, dest1);
  console.log('Copied image 1');
  fs.copyFileSync(src2, dest2);
  console.log('Copied image 2');
} catch (err) {
  console.error(err);
}
