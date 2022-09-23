import {
  trigger,
  transition,
  style,
  query,
  group,
  animate,
} from '@angular/animations';

export const slider =
  trigger('routeAnimations',[
    transition('managementQuestion => createQuestion', slideTo('right')),
    transition('managementQuestion => editQuestion', slideTo('right')),
    transition('managementQuestion => listQuestions', slideTo('right')),

    transition('createQuestion => managementQuestion', slideTo('left')),
    transition('createQuestion => editQuestion', slideTo('right')),
    transition('createQuestion => listQuestions', slideTo('right')),

    transition('editQuestion => managementQuestion', slideTo('left')),
    transition('editQuestion => createQuestion', slideTo('left')),
    transition('editQuestion => listQuestions', slideTo('right')),

    transition('listQuestions => managementQuestion', slideTo('left')),
    transition('listQuestions => createQuestion', slideTo('left')),
    transition('listQuestions => editQuestion', slideTo('left')),

  ])

  function slideTo(direction: any){
    return [
      query(':enter, :leave',[
        style({
          position: 'absolute',
          top: 0,
          [direction]: 0,
          width: '100%'
        })
      ], {optional: true}),
      query(':enter',[
        style({ [direction]: '-100%' })
      ], {optional: true}),
      group([
        query(':leave',[
          animate('300ms ease',  style({ [direction]: '100%' })),
        ], {optional: true}),
        query(':enter',[
          animate('300ms ease',  style({ [direction]: '0%' })),
        ], {optional: true}),
      ])
    ];
  }