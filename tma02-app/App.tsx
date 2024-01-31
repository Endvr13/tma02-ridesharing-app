/**
 * TM352 23J TMA02 Q1, code
 *
 * 26/10/2023 Intial version Chris Thomson
 * 14/12/2023 Line 74 modified to getDate rather than getDay Chris Thomson
 * 
 * This is the main application code for the React Native application.
 * It is a simple application that allows a user to register a userid
 * and then make a taxi request or offer.
 * 
 * The application uses the Expo framework to provide access to the
 * device GPS and to provide a simple UI.
 * 
 * The application uses the TaxiService library to access the taxi
 * service API.
 * 
 * The application uses the NominatimService library to access the
 * Nominatim service to lookup the address of the current GPS location.
 * 
 * The application uses the TimePicker, AddressPicker and WaitTime
 * components to provide a simple UI.
 **/

import { EvaIconsPack } from '@ui-kitten/eva-icons';

import { IconRegistry} from '@ui-kitten/components';
import { AppNavigator } from './components/navigation.component';
import { ThemeProvider } from './components/theme-context';


export default function App() {
  // The UI for the application.

  return (
    <>
      <IconRegistry icons={EvaIconsPack}/>
      <ThemeProvider> 
          <AppNavigator/>
      </ThemeProvider>
    </>
  );
}