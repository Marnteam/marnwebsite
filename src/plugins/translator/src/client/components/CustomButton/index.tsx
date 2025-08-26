import type { CustomPublishButton, CustomSaveButton } from 'payload'

export const CustomButton = (type: 'publish' | 'save'): CustomPublishButton | CustomSaveButton => {
  return {
    clientProps: {
      type,
    },
    path: 'src/plugins/translator/src/client/components/CustomButton/CustomButtonWithTranslator#CustomButtonWithTranslator',
  }
}
