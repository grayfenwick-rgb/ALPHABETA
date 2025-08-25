export async function loadGoogleFonts(limit = 100): Promise<string[]> {
  const fonts = [
    'Roboto', 'Open Sans', 'Lato', 'Montserrat', 'Oswald', 'Raleway', 'Poppins',
    'Source Sans Pro', 'Inter', 'Merriweather', 'Nunito', 'Rubik', 'Work Sans',
    'Nunito Sans', 'PT Sans', 'Playfair Display', 'Ubuntu', 'Muli', 'Quicksand',
    'Fira Sans', 'Barlow', 'Lora', 'Heebo', 'Anton', 'Cabin', 'Manrope',
    'Karla', 'Bebas Neue', 'DM Sans', 'Inconsolata', 'PT Serif', 'Mukta', 'Libre Franklin',
    'Josefin Sans', 'Arimo', 'Cormorant', 'Hind', 'Prompt', 'Archivo', 'Varela Round',
    'Teko', 'Signika', 'Titillium Web', 'Exo 2', 'Assistant', 'Asap', 'Overpass', 'Maven Pro',
    'Jost', 'Mulish', 'Arvo', 'Abel', 'Sora', 'Orbitron', 'Lobster', 'Dosis', 'Pacifico'
  ];
  return fonts.slice(0, limit);
}
