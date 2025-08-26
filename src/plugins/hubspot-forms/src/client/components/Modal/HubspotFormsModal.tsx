import './styles.scss'

import { Modal, XIcon, useTranslation, TextInput } from '@payloadcms/ui'

import { useHubspotForms } from '../../providers/HubspotForms/context'

export const HubspotFormsModal = () => {
  const {
    modalSlug,
    closeModal,
    isOpen,
    forms,
    loadForms,
    selectAndApply,
    query,
    setQuery,
    loading,
  } = useHubspotForms()
  const { t } = useTranslation()

  if (!isOpen) return null

  return (
    <Modal
      className={'hubspot-forms__modal'}
      slug={modalSlug}
      onEnter={loadForms}
      style={{ zIndex: 101 }}
    >
      <div className={'hubspot-forms__wrapper'}>
        <button aria-label="Close" className={'hubspot-forms__close'} onClick={closeModal}>
          <XIcon />
        </button>
        <header className={'hubspot-forms__header'}>
          <h2 className={'hubspot-forms__title'}>{t('plugin-hubspot-forms:modalTitle' as any)}</h2>
          <p className={'hubspot-forms__subtitle'}>
            Select a HubSpot form to import its fields into this Payload form. You need to save the
            document first before applying the form.
          </p>
        </header>

        <div className={'hubspot-forms__toolbar'}>
          {/* <input
            // className={'hubspot-forms__search'}
            id={`hubspot-forms__search`}
            name={`hubspot-forms__search`}
            placeholder={t('plugin-hubspot-forms:searchPlaceholder' as any)}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
          /> */}
          <TextInput
            path={`hubspot-forms__search`}
            placeholder={t('plugin-hubspot-forms:searchPlaceholder' as any)}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className={'hubspot-forms__list'}>
          {loading && (
            <div className={'hubspot-forms__loading'}>
              <div className={'hubspot-forms__skeleton'} />
              <div className={'hubspot-forms__skeleton'} />
              <div className={'hubspot-forms__skeleton'} />
            </div>
          )}
          {!loading &&
            forms.map(({ id, name, portalId }) => (
              <button
                key={id}
                className={'hubspot-forms__list-item'}
                onClick={() => selectAndApply({ id })}
                type="button"
              >
                <div className={'hubspot-forms__list-item__body'}>
                  <div className={'hubspot-forms__list-name'}>{name}</div>
                  <div className={'hubspot-forms__list-meta'}>
                    <code>{portalId}</code>
                    <span> • </span>
                    <code>{id}</code>
                  </div>
                </div>
              </button>
            ))}
        </div>
      </div>
    </Modal>
  )
}
