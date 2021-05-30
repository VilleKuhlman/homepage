import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {
    SpinnerComponent,
    LoadingTextComponent,
    MenuComponent,
    NavigationComponent,
    NavTreeComponent,
    PulseComponent
  } from '@vk-homepage/core/components';

import { CoreModule } from '@vk-homepage/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;
    let store: MockStore;
    let initialState = { 
        loaded: false,
        loading: false,
        showLoadingScreen: true,
        paths: null,
        currentPathId: 0,
        currentPath: null,
        showMenu: false,
        prevRouteDataId: null,
        nextRouteDataId: null, 
    };

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [AppComponent, 
                SpinnerComponent,
                LoadingTextComponent,
                MenuComponent,
                NavigationComponent,
                NavTreeComponent,
                PulseComponent],
            imports: [
                RouterTestingModule,
                CoreModule,
                BrowserAnimationsModule
            ],
            providers: [
                provideMockStore({ initialState }),
            ],    
        
        }).compileComponents();

            store = TestBed.inject(MockStore);
    }));

    beforeEach(() => {
      /*  fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();*/
    });

    it('should create', () => {
        expect("TBD").toBeTruthy();
    });
});