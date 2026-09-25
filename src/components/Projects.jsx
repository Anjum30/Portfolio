import { useState } from "react";
import Reveal from "./Reveal.jsx";
import SectionHead from "./SectionHead.jsx";

const PRODUCTS = [
  { name: "Sneakers", price: 59, color: "#f4b6a0" },
  { name: "Backpack", price: 45, color: "#a9d6c2" },
  { name: "Watch", price: 120, color: "#b9c4f5" },
];

// Small working cart shown as the ShopNest preview
function ShopMock() {
  const [cart, setCart] = useState([]);
  const total = cart.reduce((sum, p) => sum + p, 0);

  return (
    <div className="mock" aria-label="ShopNest preview">
      <div className="dots"><i /><i /><i /></div>
      <div className="shop-top">
        <span>ShopNest</span>
        <span className="cart">
          Cart <span key={cart.length} className="bump">{cart.length}</span> · ${total}
        </span>
      </div>
      <div className="grid">
        {PRODUCTS.map((p) => (
          <div className="item" key={p.name}>
            <div className="pic" style={{ background: p.color }} />
            <b>{p.name}</b>${p.price}
            <button onClick={() => setCart([...cart, p.price])}>Add to cart</button>
          </div>
        ))}
      </div>
      {cart.length > 0 && <button className="clear" onClick={() => setCart([])}>Clear cart</button>}
    </div>
  );
}

function CoffeeMock() {
  const menu = [["Espresso", "$3"], ["Flat white", "$4"], ["Cold brew", "$5"]];
  return (
    <div className="mock coffee" aria-label="Bean and Bloom preview">
      <div className="cupbox">
        {[10, 28, 46].map((left, i) => (
          <span key={left} className="steam" style={{ left, animationDelay: i * 0.7 + "s" }} />
        ))}
        <div className="cup" role="img" aria-label="Coffee cup" />
      </div>
      <div>
        <h4>Bean &amp; Bloom</h4>
        <ul>
          {menu.map(([item, price]) => (
            <li key={item}><span>{item}</span><span>{price}</span></li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Project({ flip, mock, title, text, tags, demo = "#", code = "#" }) {
  return (
    <Reveal cls={"project" + (flip ? " flip" : "")}>
      {mock}
      <div>
        <h3>{title}</h3>
        <p>{text}</p>
        <ul className="tags">{tags.map((t) => <li key={t}>{t}</li>)}</ul>
        <div className="links">
          <a href={demo}>Live demo</a>
          <a href={code}>Source code</a>
        </div>
      </div>
    </Reveal>
  );
}

export default function Projects() {
  return (
    <section id="projects">
      <div className="wrap">
        <SectionHead title="Projects" text="A full React store and a simple coffee shop site. Try the buttons in the store preview." />
        <Project
          mock={<ShopMock />}
          title="ShopNest, an e-commerce store"
          text="A React shopping site where people browse products, filter by category, add items to a cart and check out."
          tags={["React", "React Router", "Context API", "CSS"]}
        />
        <Project
          flip
          mock={<CoffeeMock />}
          title="Bean & Bloom, a coffee shop site"
          text="A simple, responsive site for a local café with a menu, opening hours and a contact section, built without frameworks."
          tags={["HTML", "CSS", "JavaScript"]}
        />
      </div>
    </section>
  );
}
