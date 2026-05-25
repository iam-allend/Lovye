interface Props {
  title: string;
  category: string;
  price: number;
  badge: string;
}

export default function TemplateCard({
  title,
  category,
  price,
  badge,
}: Props) {
  return (
    <div className="lovye-template-card">
      <div className="lovye-template-image">
        <div className="lovye-template-badge">
          {badge}
        </div>
      </div>

      <div className="lovye-template-content">
        <div>
          <p className="lovye-template-category">
            {category}
          </p>

          <h3>{title}</h3>
        </div>

        <div className="lovye-template-bottom">
          <span>Rp {price.toLocaleString("id-ID")}</span>

          <button>
            Preview
          </button>
        </div>
      </div>
    </div>
  );
}