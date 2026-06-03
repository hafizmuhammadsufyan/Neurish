import './ChildJourneySection.css';

const journeyStages = [
  {
    stage: 'Newborn',
    title: 'A new life awakens in your arms.',
    caption: 'Soft eyes, steady breathing, and the first gentle echoes of attachment.',
    accent: 'soft',
  },
  {
    stage: 'Exploring',
    title: 'The world becomes a place to reach for.',
    caption: 'Tiny hands discover texture, sound, and the rhythm of daily life.',
    accent: 'bright',
  },
  {
    stage: 'Facing Challenges',
    title: 'Every emotion is the start of a strength.',
    caption: 'Big feelings, pushback, and uncertainty become the first lessons in self-control.',
    accent: 'calm',
  },
  {
    stage: 'Learning',
    title: 'Small moments become powerful growth.',
    caption: 'Language blooms, curiosity expands, and adults begin to recognize their influence.',
    accent: 'warm',
  },
  {
    stage: 'Confident',
    title: 'A child moving toward possibility.',
    caption: 'Independent steps, brave questions, and a spark of confidence take shape.',
    accent: 'gold',
  }
];

export default function ChildJourneySection() {
  return (
    <section className="lp-section lp-journey-section">
      <div className="lp-container">
        <div className="lp-section-header">
          <h2 className="lp-section-title">A Single Story, Seen Through Every Stage.</h2>
          <p className="lp-section-subtitle">
            One child, one family, one unfolding journey. These are the quiet transitions that make early childhood feel cinematic and deeply human.
          </p>
        </div>

        <div className="lp-journey-grid">
          {journeyStages.map((item, idx) => (
            <div key={idx} className={`lp-journey-card lp-journey-${item.accent}`}>
              <div className="lp-journey-portrait">
                <div className="journey-head" />
                <div className="journey-body" />
                <div className="journey-shadow" />
              </div>
              <div className="lp-journey-copy">
                <span className="lp-journey-stage">{item.stage}</span>
                <h3>{item.title}</h3>
                <p>{item.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
