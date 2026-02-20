export const restaurant = {
  icon: '☕',
  name: 'UZO Bar & Kitchen',
  tagline: 'Fresh, seasonal, made with love',
  // address: 'Amsterdam',
  // phone: '',
  hours: {
    0: { open: '14:00', close: '22:00', label: 'Sun' }, 
    1: { open: '12:00', close: '22:00', label: 'Mon' }, 
    2: null, 
    3: { open: '12:00', close: '22:00', label: 'Wed' }, 
    4: { open: '12:00', close: '23:00', label: 'Thu' }, 
    5: { open: '12:00', close: '24:00', label: 'Fri' }, 
    6: { open: '12:00', close: '24:00', label: 'Sat' }, 
  },
  happyHour: {
    start: ['00:00', '20:00'],
    end: ['01:00', '21:59'],
    discount: '40%',
    //days: [0, 1, 3, 4, 5, 6] // 0 = Sunday, 6 = Saturday
  }
}

export const drinkCategories = [
  {
    id: 'happyhour',
    label: 'Happy Hour Deals',
    icon: '🍻',
    style: 'card',
    happyHourOnly: true, // Flag to only show during happy hour
    featured: [
      { img: 'heineken.png', badge: 'popular', name: 'Heineken | 5%', desc: 'The most refreshing pilsener.', 
        happyHour: true,
        featuredTag: 'ON TAP',
        sizes:[  
            { label: '25cl', price: '€4.00' },
            { label: '50cl', price: '€8.00' }
        ]
      },
      { img: 'oedipus.png', name: 'Oedipus Mannenliefde | 6%', desc: 'Modern blond beer brewed with saison yeast and lemongrass. From Amsterdam ❤️',
        happyHour: true, 
        featuredTag: 'ON TAP',
        sizes:[  
            { label: '25cl', price: '€5.50' },
            { label: '50cl', price: '€10.00' }
        ]
      },
      { img: 'heineken.png', happyHour: true, name: 'Heineken 0.0%', desc: '300ml', price: '€4.00' },
    ],
    items: []
  },
  {
    id: 'hot-drinks',
    label: 'Hot Beverages',
    icon: '☕',
    layout: 'compact',
    items: [
      { 
        icon: '🍵', name: 'Tea',
        price: '€3.00',
        flavors: ['Earl Grey', 'Lemon Green']
      },
      { 
        icon: '🍵', name: 'Fresh Mint Tea', 
        desc: 'served with honey',
        price: '€3.80' 
      },
      { 
        icon: '☕', name: 'Coffee', 
        price: '€3.50', 
      },
      { icon: '☕', name: 'Espresso',
        sizes:[  
            { label: 'Single', price: '€3.50' },
            { label: 'Double', price: '€5.00' }
        ]
      },
      { 
        icon: '☕', name: 'Cappuccino', 
        desc: 'regular milk', 
        price: '€4.50' 
      },
      { 
        icon: '☕', name: 'Latte', 
        desc: 'regular milk', 
        price: '€4.50' 
      },
      { 
        icon: '☕', name: 'Latte Macchiato', 
        desc: 'regular milk', 
        price: '€4.80' 
      },
      { 
        icon: '☕', name: 'Hot Chocolate', 
        price: '€4.50',
        extras: [
          { name: 'Whipped Cream', price: '+€0.50' }
        ],  
      },
      // { icon: '🧋', name: 'Iced Matcha', desc: 'Ceremonial matcha, oat milk', price: '€5.50', badge: 'new' },
      { 
        icon: '☕', name: 'Irish Coffee',
        desc: 'jameson, whipped cream', 
        price: '€9.70' 
      },
    ]
  },
  {
    id: 'soft',
    label: 'Soft Drinks',
    icon: '🥤',
    layout: 'compact',
    items: [
      { img: 'cola.png', name: 'Coca Cola', price: '€3.60' },
      { img: 'cola-zero.png', name: 'Coca Cola Zero', price: '€3.60' },
      { img: 'fanta.png', name: 'Fanta Orange', price: '€3.60' },
      { img: 'sprite.png', name: 'Sprite', price: '€3.60' },
      { img: 'lipton.png', name: 'Lipton Ice Tea', price: '€3.60',
        flavors: ['Peach', 'Sparkling', 'Green']
      },
      { img: 'royal-club.png', name: 'Tonic Water ', price: '€3.60' },
      { img: 'royal-club.png', name: 'Ginger Ale', price: '€3.60' },
      { img: 'royal-club.png', name: 'Ginger Beer', price: '€3.60' },
      { img: 'royal-club.png', name: 'Pink Grapefruit Zero', price: '€3.60' },
      { img: 'chocomel.png', name: 'Chocomel', price: '€3.60' },
      { img: 'redbull.png', name: 'Redbull', price: '€4.50' },
      { img: 'juice.png', name: 'Juice', price: '€3.60',
        flavors: ['Apple', 'Orange']
      },
      { img: 'spa.png', name: 'Water 50cl', price: '€3.30',
        flavors: ['Still', 'Sparkling']
      }
    ]
  },
  {
    id: 'draught',
    label: 'Draught Beer',
    icon: '🍺',
    items: [
      { img: 'heineken.png', badge: 'popular', name: 'Heineken | 5%', desc: 'The most refreshing pilsener.', 
        happyHour: true,
        sizes:[  
            { label: '25cl', price: '€4.00' },
            { label: '50cl', price: '€8.00' }
        ]
      },
      { img: 'moretti.png', badge: 'popular', name: 'Birra Moretti | 4.6%', desc: 'Authentic subtle and fresh beer with a delicate flavour.', 
        sizes:[  
            { label: '25cl', price: '€4.00' },
            { label: '50cl', price: '€8.00' }
        ]
      },
      { img: 'leffe.png', name: 'Leffe Blond | 6.7%', desc: 'Blonde, malty-sweet flavour balanced with fruity, slightly bitter finish.', 
        sizes:[  
            { label: '25cl', price: '€6.00' },
            { label: '50cl', price: '€11.00' }
        ]
      },
      { img: 'guinness.png', badge: 'popular', name: 'Guinness | 4.3%', desc: 'Stout, toasted flavour, bitter finish.', 
        sizes:[  
            { label: '25cl', price: '€5.50' },
            { label: '50cl', price: '€10.00' }
        ]
      },
      { img: 'oedipus.png', name: 'Oedipus Mannenliefde | 6%', desc: 'Modern blond beer brewed with saison yeast and lemongrass. From Amsterdam ❤️',
        happyHour: true, 
        sizes:[  
            { label: '25cl', price: '€5.50' },
            { label: '50cl', price: '€10.00' }
        ]
      },
      { img: 'oedipus.png', name: 'Oedipus Bride | 5%', desc: 'A relatively dry witbier from Amsterdam with hoppy citrus notes and fresh orange peel. Refreshing with just enough spice from green pepper.', 
        sizes:[  
            { label: '25cl', price: '€5.50' },
            { label: '50cl', price: '€10.00' }
        ]
      },
      { img: 'texel.png', badge:'popular', name: 'Texels Skuumkoppe | 6%', desc: 'A character dark wheat beer that tastes in every season. Full of flavour with hints of caramel and apricot and has a creamy, slightly sweet finish.', 
        sizes:[  
            { label: '25cl', price: '€5.50' },
            { label: '50cl', price: '€10.00' }
        ]
      },
      { img: 'ipa.png',  name: 'Lagunitas IPA | 6.2%', desc: 'Beautifully balanced citrus tones, slightly sweet and combined with a fresh-bitter, soft aftertaste.', 
        sizes:[  
            { label: '25cl', price: '€6.00' },
            { label: '50cl', price: '€11.00' }
        ]
      }
      // { img: 'ipa.png', name: 'Corona', desc: 'Mexican lager, served with lime — 330ml', price: '€5.00' },
    ]
  }, 
  {
    id: 'bottled',
    label: 'Bottled Beers',
    icon: '🍺',
    items: [
      { img: 'corona.png', badge: 'popular', name: 'Corona | 4.5%', desc: 'Mexican lager, served with lime. — 330ml', price: '€5.50' },
      { img: 'desperados.png', name: 'Desperados | 5.9%', desc: 'Tequila‑flavoured lager with a sweet, citrus‑leaning taste that feels more like a party drink than a classic beer. — 330ml', price: '€5.50' },
      { img: 'chouffe.png', name: 'La Chouffe | 8%', desc: 'A lively Belgian blonde beer with fruity esters, a touch of coriander spice, and a smooth, slightly hoppy finish.  — 330ml', price: '€6.90' },
      { img: 'duvel.png', name: 'Duvel | 8.5%', desc: 'A strong golden ale that’s crisp, highly carbonated, and full of subtle fruit and spice, finishing dry and dangerously easy to drink.  — 330ml', price: '€6.90' },
      { img: 'affligem.png', name: 'Affligem Blond | 6.7%', desc: 'A balanced golden ale with soft malt sweetness, light fruitiness, and a smooth, mildly bitter finish.  — 300ml', price: '€6.00' },
      { img: 'affligem.png', name: 'Affligem Double | 6.7%', desc: 'A deeper, darker ale featuring caramel malts, hints of dried fruit, and a warm, rounded body. — 300ml', price: '€6.20' },
      { img: 'affligem.png', name: 'Affligem Triple | 9%', desc: 'A stronger, aromatic golden ale with spicy yeast character, honey‑like malt, and a dry, warming finish. — 300ml', price: '€7.00' },
    ]
  },
  {
    id: 'bottled-zero',
    label: '0.0% Beers',
    icon: '🍺',
    items: [
      { img: 'heineken.png', happyHour: true, name: 'Heineken 0.0%', desc: '300ml', price: '€4.00' },
      { img: 'rose.png', badge: '', name: 'Amstel Rosé 0.0%', desc: '300ml', price: '€4.50' },
      { img: 'texel.png', badge: '', name: 'Texel Skuumkoppe 0.0%', desc: '300ml', price: '€5.00' },
      { img: 'leffe.png', badge: 'popular', name: 'Leffe Blond 0.0%', desc: '330ml', price: '€4.50' },
      { img: 'corona.png', badge: '', name: 'Corona 0.0%', desc: '330ml', price: '€4.50' },

    ]
  },
  {
    id: 'cider',
    label: 'Fruity & Cider',
    icon: '🍺',
    items: [
      { img: 'amstel.png', badge: '', name: 'Amstel Radler | 2%', desc: 'Lemon flavour — 300ml', price: '€4.80' },
      { img: 'rose.png', badge: '', name: 'Amstel Rosé | 4%', desc: '300ml', price: '€5.00' },
      { img: 'kriek.png', badge: 'popular', name: `Lindeman's Kriek | 3.5%`, desc: '250ml', price: '€5.00' },
      { img: 'kwak.png', badge: '', name: `Kwak Rouge | 8%`, desc: 'Cherry flavour — 330ml', price: '€6.50' },
      { img: 'sb.png', badge: 'popular', name: 'Somersby Cider Apple | 4.5%', desc: '300ml', price: '€6.00' },
      { img: 'sb.png', badge: '', name: 'Somersby Cider Blackberry | 4.5%', desc: '300ml', price: '€6.00' },
      { img: 'magners.png', badge: '', name: 'Magners Cider Pint | 4.5%', desc: '570ml', price: '€10.00' },
    ]
  },
  {
    id: 'cocktails',
    label: 'Cocktails',
    icon: '🍸',
    items: [
      { icon: '🥂', name: 'Aperol Spritz', desc: 'Aperol, prosecco, soda, orange slice', price: '€11.00', badge: 'popular' },
      { icon: '🥂', name: 'Limoncello Spritz', desc: 'Limoncello, prosecco, soda, lemon', price: '€11.00', badge: '' },
      { icon: '🥂', name: 'Elderflower Spritz', desc: 'Elderflower, prosecco, soda, lime, mint', price: '€11.00', badge: '' },
      { icon: '🍸', name: 'Espresso Martini', desc: 'Espresso, vodka, coffee liquor, caramel', price: '€11.00', badge: 'popular' },
      { icon: '🍹', name: 'House Mojito', desc: 'Fresh mint, lime, rum, soda, sugar', price: '€10.50', badge: 'popular' },
      { icon: '🍹', name: 'Pink Lady', desc: 'Pink gin, pink grapefruit soda, summer berries', price: '€10.50', badge: 'new' },
      { icon: '🥃', name: 'Whiskey Sour', desc: 'Whiskey, lemon, egg white, sugar', price: '€12.00' },
    ]
  },
  {
    id: 'snacks',
    label: 'Bar Snacks',
    icon: '🥜',
    layout: 'compact',
    items: [
      { icon: '🥜', name: 'Nuts Mix (Salted)', price: '€6.00' },
      { img: 'naturel.png', name: 'Lays Naturel', price: '€2.00' },
      { img: 'bolognese.png', name: 'Lays Bolognese', price: '€2.00' },
      { img: 'doritos.png', name: 'Doritos Nacho Cheese', price: '€2.00' },
    ]
  },
]

export const foodCategories = [
  {
    id: 'breakfast',
    label: 'Breakfast',
    icon: '🍳', 
    featured: {
      icon: '🍳', name: 'Avocado Smash Toast',
      desc: 'Sourdough, smashed avo, poached egg, chilli flakes, microgreens',
      price: '€14.50',
      badge: 'popular',
      featuredTag: "⭐ Chef's Pick"
    },
    items: [
      { icon: '🥞', name: 'Fluffy Pancakes', desc: 'Stack of 3, maple syrup, seasonal berries, whipped cream', price: '€11.00', badge: 'default', badgeLabel: '🌾 Veggie' },
      { icon: '🥚', name: 'Eggs Benedict', desc: 'Poached eggs, smoked salmon, hollandaise, English muffin', price: '€13.50', badge: 'popular' },
    ]
  },
  {
    id: 'lunch',
    label: 'Lunch',
    icon: '🥗',
    featured: null,
    items: [
      { icon: '🥗', name: 'Seasonal Grain Bowl', desc: 'Quinoa, roasted veg, feta, tahini drizzle, mixed seeds', price: '€13.00', badge: 'vegan' },
      { icon: '🥪', name: 'Club Sandwich', desc: 'Toasted triple decker, chicken, bacon, lettuce, tomato, fries', price: '€14.00', badge: 'popular' },
      { icon: '🍜', name: 'Tomato Bisque Soup', desc: 'Roasted tomato, basil oil, crusty sourdough on the side', price: '€8.50', badge: 'new' },
    ]
  },
  // {
  //   label: 'Pastries',
  //   icon: '🥐',
  //   featured: null,
  //   items: [
  //     { icon: '🥐', name: 'Butter Croissant', desc: 'Classic French, flaky, baked fresh every morning', price: '€3.50', badge: 'default', badgeLabel: '🥖 Bakery' },
  //     { icon: '🍫', name: 'Chocolate Brownie', desc: 'Dense, fudgy, dark chocolate, topped with sea salt', price: '€4.00', badge: 'popular' },
  //     { icon: '🫐', name: 'Blueberry Muffin', desc: 'Loaded with fresh blueberries, lemon zest glaze', price: '€3.80', badge: 'vegan' },
  //   ]
  // }
]