import {
    createSelector,
    createFeatureSelector,
    Action,
    ActionReducerMap,
  } from '@ngrx/store';
  
  /**
   * Every reducer module's default export is the reducer function itself. In
   * addition, each module should export a type or interface that describes
   * the state of the reducer plus any selector functions. The `* as`
   * notation packages up all of the exports into a single object.
   */
  
  import * as fromLayout from '@vk-homepage/core/reducers/layout.reducer';
  import * as fromContact from '@vk-homepage/contact/reducers';
  import { InjectionToken } from '@angular/core';
  
  /**
   * As mentioned, we treat each reducer like a table in a database. This means
   * our top level state interface is just a map of keys to inner state types.
   */
  export interface State {
    [fromLayout.layoutFeatureKey]: fromLayout.State;
  }

  /**
   * Our state is composed of a map of action reducer functions.
   * These reducer functions are called with each dispatched action
   * and the current or initial state and return a new immutable state.
   */
  export const ROOT_REDUCERS = new InjectionToken<
    ActionReducerMap<State, Action>
  >('Root reducers token', {
    factory: () => ({
      [fromLayout.layoutFeatureKey]: fromLayout.reducer,
    }),
  });
    
  /**
   * Layout Reducers
   */
  export const selectLayoutState = createFeatureSelector<State, fromLayout.State>(
    'layout'
  );
  
  export const selectShowMenu = createSelector(
    selectLayoutState,
    fromLayout.selectShowMenu
  );

  export const selectPaths = createSelector(
    selectLayoutState,
    fromLayout.selectPaths
  );

  export const getPaths = createSelector(
    selectPaths,
    (entities) => {
      return entities && Object.keys(entities).map(key => entities[key]);
    }
  );

  export const selectSelectedPathId = createSelector(
    selectLayoutState,
    fromLayout.selectSelectedPathId
  );

  export const selectPrevPath = createSelector(
    selectPaths,
    selectSelectedPathId,
    (entities, selectedId) => {
      return selectedId && entities[selectedId-1]?.children ? entities[selectedId-2]?.id : entities[selectedId-1]?.id;
    }
  );

  export const selectNextPath = createSelector(
    selectPaths,
    selectSelectedPathId,
    (entities, selectedId) => {
      return selectedId && entities[selectedId+1]?.children ? entities[selectedId+1]?.children[0] : entities ? entities[selectedId+1]?.id : null;
    }
  );

  export const selectSelectedPath = createSelector(
    selectPaths,
    selectSelectedPathId,
    (entities, selectedId) => {
      return selectedId && entities[selectedId];
    }
  );

  export const selectSelectedFullPath = createSelector(
    getPaths,
    selectSelectedPathId,
    (paths, selectedId) => {
      return paths && [paths.reduce((lastPathObj,curr,index,arr) => 
      {  
        const nextPathObj = arr.filter(path => 
          path.children?.indexOf(lastPathObj.nextId)  > -1).length === 1 ? 
          arr.filter(path => path.children?.indexOf(lastPathObj.nextId) > -1)[0] : {};
              
       return  {
          nextId: nextPathObj.id ? nextPathObj.id : null,
          pathNames: nextPathObj.name ? [nextPathObj.name].concat(lastPathObj.pathNames) : lastPathObj.pathNames,
        };
      }      
      , {nextId:selectedId, pathNames:paths.filter(path => path.id === selectedId).map(path => path.name)})]
      .map(path => path.pathNames).reduce((acc, val) => acc.concat(val), []);
      ;
    }
  );

  export const selectPrevFullPath = createSelector(
    getPaths,
    selectPrevPath,
    (paths, prevPathId) => {
      return paths && [paths.reduce((lastPathObj,curr,index,arr) => 
      {  
        const nextPathObj = arr.filter(path => 
          path.children?.indexOf(lastPathObj.nextId)  > -1).length === 1 ? 
          arr.filter(path => path.children?.indexOf(lastPathObj.nextId) > -1)[0] : {};
              
       return  {
          nextId: nextPathObj.id ? nextPathObj.id : null,
          pathNames: nextPathObj.name ? [nextPathObj.name].concat(lastPathObj.pathNames) : lastPathObj.pathNames,
        };
      }      
      , {nextId:prevPathId, pathNames:paths.filter(path => path.id === prevPathId).map(path => path.name)})]
      .map(path => path.pathNames).reduce((acc, val) => acc.concat(val), []);
      ;
    }
  );

  export const selectNextFullPath = createSelector(
    getPaths,
    selectNextPath,
    (paths, nextPathId) => {
      return paths &&nextPathId&& [paths.reduce((lastPathObj,curr,index,arr) => 
      {  
        const nextPathObj = arr.filter(path => 
          path.children?.indexOf(lastPathObj.nextId)  > -1).length === 1 ? 
          arr.filter(path => path.children?.indexOf(lastPathObj.nextId) > -1)[0] : {};
              
       return  {
          nextId: nextPathObj.id ? nextPathObj.id : null,
          pathNames: nextPathObj.name ? [nextPathObj.name].concat(lastPathObj.pathNames) : lastPathObj.pathNames,
        };
      }      
      , {nextId:nextPathId, pathNames:paths.filter(path => path.id === nextPathId).map(path => path.name)})]
      .map(path => path.pathNames).reduce((acc, val) => acc.concat(val), []);
    }
  );

  export const selectLoaded = createSelector(
    selectLayoutState,
    fromLayout.selectLoaded
  );

  export const selectShowLoadingScreen = createSelector(
    selectLayoutState,
    fromLayout.selectShowLoadingScreen
  );

  export const selectPrevNav = createSelector(
    selectPrevFullPath,
    fromContact.selectSelectedQuestionParent,
    (prevFullPath, prevDataObjId) => {
      return prevDataObjId ? prevDataObjId : prevFullPath?.length > 0 ? prevFullPath.join("/") : null;
    }
  );

  export const selectNextNav = createSelector(
    selectNextFullPath,
    selectSelectedPath,
    fromContact.selectSelectedQuestionChild,
    (nextFullPath, currentPath, nextDataObjId) => {
      return currentPath.hasData && nextDataObjId && nextDataObjId ? nextDataObjId : nextFullPath?.length > 0 ? nextFullPath.join("/") : null;
    }
  );

  export const selectNavTree = createSelector(
    selectShowMenu,
    selectSelectedPathId,
    selectSelectedFullPath,
    selectShowLoadingScreen,
    (showMenu, currentPathID, fullPath, showLoadingScreen) => {
      return {showMenu, currentPathID, fullPath, showLoadingScreen}
    }
  );

  export const selectNavigation = createSelector(
    selectNextNav,
    selectPrevNav,
    selectShowMenu,
    (next, prev, showMenu) => {
      return Object.assign({}, {next:next, prev:prev, showMenu:showMenu});
    }
  );