import { useTranslation } from '@payloadcms/ui'
import { useHubspotForms } from '../../providers/HubspotForms/context'

export const HubspotSyncButton = () => {
  const { t } = useTranslation()
  const { openModal } = useHubspotForms()

  return (
    <button
      onClick={openModal}
      // aria-label={t('plugin-hubspot-forms:buttonLabel')}
      className="resolver-btn preview-btn"
      id={`hubspot-forms__sync-button`}
      title="Sync from HubSpot"
      // title={t('plugin-hubspot-forms:buttonLabel')}
      type="button"
    >
      {/* Simple HS logo */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1.538rem"
        height="1.538rem"
        viewBox="0 0 24 24"
        className="icon"
      >
        <path
          fill="currentColor"
          d="M17.1 8.6V6.2c.6-.3 1.1-.9 1.1-1.6v-.1c0-1-.8-1.8-1.8-1.8h-.1c-1 0-1.8.8-1.8 1.8v.1c0 .7.4 1.3 1.1 1.6v2.4c-.9.1-1.8.5-2.5 1.1L6.5 4.6c.3-1.1-.4-2.3-1.5-2.5s-2.2.3-2.5 1.4s.4 2.3 1.5 2.6c.5.1 1.1.1 1.6-.2l6.4 5c-1.2 1.8-1.2 4.1.1 5.9l-2 2c-.2 0-.3-.1-.5-.1c-.9 0-1.7.8-1.7 1.7S8.7 22 9.6 22s1.7-.8 1.7-1.7c0-.2 0-.3-.1-.5l1.9-1.9c2.3 1.7 5.6 1.3 7.3-1s1.3-5.6-1-7.3c-.6-.5-1.4-.9-2.3-1m-.8 7.8c-1.5 0-2.7-1.2-2.7-2.7s1.2-2.7 2.7-2.7s2.7 1.2 2.7 2.7s-1.2 2.7-2.7 2.7"
        />
      </svg>
      {/* <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1.538rem"
        height="1.538rem"
        viewBox="0 0 48 48"
        className="icon"
      >
        <path
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M41.584 27.444c0 5.088-4.127 9.213-9.218 9.213h0c-5.091 0-9.218-4.125-9.218-9.213h0c0-5.088 4.127-9.213 9.218-9.213h0c5.091 0 9.218 4.125 9.218 9.213M35.094 9.49a2.663 2.663 0 0 1-2.664 2.661h0a2.663 2.663 0 1 1 2.664-2.663zm-22.123-.714a3.277 3.277 0 0 1-3.277 3.275A3.277 3.277 0 1 1 9.693 5.5h.001a3.277 3.277 0 0 1 3.277 3.276m9.085 31.194a2.53 2.53 0 0 1-2.531 2.53a2.53 2.53 0 0 1-2.532-2.529v-.001a2.53 2.53 0 0 1 2.531-2.53h.001a2.53 2.53 0 0 1 2.53 2.53zm-.56-1.97l4.01-4.007M12.345 10.834l13.073 10.149m7.012-8.535v5.484"
          strokeWidth="1"
        />
      </svg> */}
    </button>
  )
}
