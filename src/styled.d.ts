// import original module declarations
import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    $brandColorPrimary: string;
    $neutralWhite: string;
    $blueGray900: string;
    $blueGray400: string;
    $blueGray50: string;
    $blueGray600: string;
  }
}