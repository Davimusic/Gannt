const initialState = {
  tasks: {
  'cooooo':{'diasDuracion':1, 'accionAnteriorObligatoria': 'inicio'}, 
  'azzul':{'diasDuracion':2, 'accionAnteriorObligatoria': 'inicio'}, 
  'davis': {'diasDuracion':4, 'accionAnteriorObligatoria': 'cooooo'},  
  'otro': {'diasDuracion':4, 'diasDespuesDeInicioProyecto': 4},
  'cooooo2':{'diasDuracion':1, 'accionAnteriorObligatoria': 'inicio'}, 
  'azzul2':{'diasDuracion':2, 'accionAnteriorObligatoria': 'inicio'}, 
  'davis2': {'diasDuracion':4, 'accionAnteriorObligatoria': 'cooooo'},  
  'otro2': {'diasDuracion':4, 'diasDespuesDeInicioProyecto': 4},
  'cooooo3':{'diasDuracion':1, 'accionAnteriorObligatoria': 'inicio'}, 
  'azzul3':{'diasDuracion':2, 'accionAnteriorObligatoria': 'inicio'}, 
  'davis3': {'diasDuracion':4, 'accionAnteriorObligatoria': 'cooooo'},  
  'otro3': {'diasDuracion':4, 'diasDespuesDeInicioProyecto': 4},
  'cooooo4':{'diasDuracion':1, 'accionAnteriorObligatoria': 'inicio'}, 
  'azzul4':{'diasDuracion':2, 'accionAnteriorObligatoria': 'inicio'}, 
  'davis4': {'diasDuracion':4, 'accionAnteriorObligatoria': 'cooooo'},  
  'otro4': {'diasDuracion':4, 'diasDespuesDeInicioProyecto': 4}
}
};

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_TASKS':
        return {
          ...state,
          tasks: action.payload, 
        };                                                     
    default:
      return state;
  }
};

export default counterReducer;
