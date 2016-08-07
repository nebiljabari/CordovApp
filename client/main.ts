import { bootstrap }  from 'angular2-meteor-auto-bootstrap';
import { AppCompo }   from './app.compo.ts';

bootstrap( AppCompo )
  .catch((err: any) => { throw new Meteor.Error('Bootstrap Error', err); });
