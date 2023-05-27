import { container } from 'tsyringe';

import DateFNSDateProvider from './implementations/DateFNSDateProvider';
import IDateProvider from './models/IDateProvider';

container.registerSingleton<IDateProvider>('DateProvider', DateFNSDateProvider);
