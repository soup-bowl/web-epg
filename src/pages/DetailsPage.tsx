import GuidePageShell from '../components/GuidePageShell.tsx'
import './DetailsPage.css'

type DetailsPageProps = {
  title: string
  description: string
}

export default function DetailsPage({ title, description }: DetailsPageProps) {
  return (
    <GuidePageShell title={title}>
      <div className="details-page__body">
        <p className="details-page__description">{description}</p>
      </div>
    </GuidePageShell>
  )
}
