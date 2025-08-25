export async function fetchAmbientCGTextures(query = ''): Promise<string[]> {
  const demo = [
    'https://ambientcg.com/data/Color/PaintedMetal008/Color_PaintedMetal008_1K.jpg',
    'https://ambientcg.com/data/Color/Plastic003/Color_Plastic003_1K.jpg',
    'https://ambientcg.com/data/Color/Concrete011/Color_Concrete011_1K.jpg'
  ];
  return demo;
}
