import * as React from "react"

export interface ExistingDeliverable {
  saasUrl?: string | null
  productName?: string | null
  oneLiner?: string | null
  targetUsers?: string | null
  problem?: string | null
  category?: string | null
  stage?: string | null
  updatedAt?: Date | string
}

export interface DeliverableRealtimePayload {
  saas_url?: string | null
  product_name?: string | null
  one_liner?: string | null
  target_users?: string | null
  problem?: string | null
  category?: string | null
  stage?: string | null
  updated_at?: string
}

export interface SubmittedDeliverable {
  saasUrl?: string | null
  productName?: string | null
  oneLiner?: string | null
  targetUsers?: string | null
  problem?: string | null
  category?: string | null
  stage?: string | null
}

interface DeliverableFields {
  saasUrl: string
  productName: string
  oneLiner: string
  targetUsers: string
  problem: string
  category: string
  stage: string
}

export type DeliverableFieldKey = keyof DeliverableFields

interface DeliverableStatus {
  loading: boolean
  error: string | null
  success: boolean
  isSynced: boolean
  lastUpdated: Date | null
}

interface DeliverableFormState extends DeliverableStatus {
  fields: DeliverableFields
}

const getInitialFields = (existingDeliverable?: ExistingDeliverable): DeliverableFields => ({
  saasUrl: existingDeliverable?.saasUrl || "",
  productName: existingDeliverable?.productName || "",
  oneLiner: existingDeliverable?.oneLiner || "",
  targetUsers: existingDeliverable?.targetUsers || "",
  problem: existingDeliverable?.problem || "",
  category: existingDeliverable?.category || "",
  stage: existingDeliverable?.stage || "",
})

const parseUpdatedAt = (updatedAt?: Date | string) =>
  updatedAt ? new Date(updatedAt) : null

export function useDeliverableForm(existingDeliverable?: ExistingDeliverable) {
  const [state, setState] = React.useState<DeliverableFormState>(() => ({
    fields: getInitialFields(existingDeliverable),
    loading: false,
    error: null,
    success: false,
    isSynced: true,
    lastUpdated: parseUpdatedAt(existingDeliverable?.updatedAt),
  }))

  const setField = React.useCallback((key: DeliverableFieldKey, value: string) => {
    setState((prev) => ({
      ...prev,
      fields: {
        ...prev.fields,
        [key]: value,
      },
    }))
  }, [])

  const setFields = React.useCallback((partial: Partial<DeliverableFields>) => {
    setState((prev) => ({
      ...prev,
      fields: {
        ...prev.fields,
        ...partial,
      },
    }))
  }, [])

  const setStatus = React.useCallback((partial: Partial<DeliverableStatus>) => {
    setState((prev) => ({
      ...prev,
      ...partial,
    }))
  }, [])

  const applyRealtimeUpdate = React.useCallback(
    (payload: DeliverableRealtimePayload) => {
      setFields({
        saasUrl: payload.saas_url || "",
        productName: payload.product_name || "",
        oneLiner: payload.one_liner || "",
        targetUsers: payload.target_users || "",
        problem: payload.problem || "",
        category: payload.category || "",
        stage: payload.stage || "",
      })
      if (payload.updated_at) {
        setStatus({ lastUpdated: new Date(payload.updated_at) })
      }
    },
    [setFields, setStatus]
  )

  const applySubmittedDeliverable = React.useCallback(
    (deliverable: SubmittedDeliverable) => {
      setFields({
        saasUrl: deliverable.saasUrl || "",
        productName: deliverable.productName || "",
        oneLiner: deliverable.oneLiner || "",
        targetUsers: deliverable.targetUsers || "",
        problem: deliverable.problem || "",
        category: deliverable.category || "",
        stage: deliverable.stage || "",
      })
    },
    [setFields]
  )

  return {
    fields: state.fields,
    loading: state.loading,
    error: state.error,
    success: state.success,
    isSynced: state.isSynced,
    lastUpdated: state.lastUpdated,
    setField,
    setStatus,
    applyRealtimeUpdate,
    applySubmittedDeliverable,
  }
}
