import type { CustomPublishButton, CustomSaveButton } from 'payload'

export const CustomButton = (type: 'publish' | 'save'): CustomPublishButton | CustomSaveButton => {
  return {
    clientProps: {
      type,
    },
    path: 'src/plugins/hubspot-forms/src/client/components/CustomButton/CustomButtonWithHubspot#CustomButtonWithHubspot',
  }
}
