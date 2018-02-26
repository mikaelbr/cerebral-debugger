import { set, toggle, equals, wait } from 'cerebral/operators'
import { state, props } from 'cerebral/tags'
import * as actions from './actions'

export const toggleAction = actions.toggleAction

export const setError = set(state`error`, props`error`)

export const createSignalTest = [
  actions.createSignalTest,
  set(state`hasCreatedSignalTest`, true),
  wait(2000),
  set(state`hasCreatedSignalTest`, false)
]

export const emptySearchValue = set(state`searchValue`, '')

export const updateModel = actions.updateModel

export const resetMutationPath = set(state`currentMutationPath`, null)

export const setMutationPath = [
  set(state`currentPage`, 'model'),
  set(state`currentMutationPath`, props`path`)
]

export const remember = actions.remember

export const changePage = set(state`currentPage`, props`page`)

export const updateExpandedPaths = actions.updateExpandedPaths

export const handlePayload = [
  equals(props`type`),
  {
    init: [actions.clean, actions.setInitialPayload],
    bulk: [actions.clean, actions.parseAndRunMessages],
    executionStart: actions.addSignal,
    execution: [
      actions.updateSignal,
      actions.runMutation,
      actions.showHideAllActions
    ],
    executionFunctionEnd: actions.updateActionOutput,
    executionPathStart: actions.updateSignalPath,
    executionEnd: actions.endSignalExecution,
    executionFunctionError: actions.updateActionError,
    components: [
      set(state`componentsMap`, props`data.map`),
      actions.updateRenders
    ],
    recorderMutation: actions.runRecordedMutation
  }
]

export const toggleProps = actions.toggleProps

export const reset = actions.reset

export const changeSearchValue = set(state`searchValue`, props`value`)

export const changeSearchComponentValue = set(
  state`searchComponentValue`,
  props`value`
)

export const toggleShowActions = [
  toggle(state`storage.showActions`),
  actions.showHideAllActions,
  actions.storeOptions
]

export const toggleShowProps = [
  toggle(state`storage.showProps`),
  actions.storeOptions
]

export const setSignal = [
  set(state`currentPage`, 'signals'),
  actions.setCurrentExecutionId,
  actions.showHideAllActions
]

export const toggleFullPathName = [
  toggle(state`storage.showFullPathNames`),
  actions.storeOptions
]
