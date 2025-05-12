import { CategorizedDropdown } from "@/components/ui/CategorizedDropdown";
import { useLanguage } from "@/contexts/language-context";
export function LocationAdress() {
  const { t } = useLanguage();
  const categories = [
    {
      name: t("g_Tunis", "gouvernorate"),
      items: [{ value: "Marché de gros", label: "Marché de gros" }],
    },
    {
      name: t("g_Ariana", "gouvernorate"),
      items: [
        { value: "Marché de gros Ariana", label: "Marché de gros Ariana" },
      ],
    },
    {
      name: t("g_Ben_Arous", "gouvernorate"),
      items: [
        {
          value: "Marché de gros  Bir el Kassa",
          label: "Marché de gros  Bir el Kassa",
        },
      ],
    },
    {
      name: t("g_Manouba", "gouvernorate"),
      items: [
        {
          value: "Marché de gros de manouba",
          label: "Marché de gros de manouba",
        },
      ],
    },
    {
      name: t("g_Nabeul", "gouvernorate"),

      items: [
        {
          value: "Marché de gros de légumes et fruits de Menzel Témim",
          label: "Marché de gros de légumes et fruits de Menzel Témim",
        },
        {
          value: "Marché de gros de légumes et fruits de El Haouaria",
          label: "Marché de gros de légumes et fruits de El Haouaria",
        },
        {
          value: "Marché de gros de légumes et fruits de Tazarka",
          label: "Marché de gros de légumes et fruits de Tazarka",
        },
        {
          value: "Marché de gros de légumes et fruits de Korba",
          label: "Marché de gros de légumes et fruits de Korba",
        },
        {
          value: "Marché de gros de légumes et fruits de Menzel Hor",
          label: "Marché de gros de légumes et fruits de Menzel Hor",
        },
        {
          value: "Marché de gros de légumes et fruits de Kélibia",
          label: "Marché de gros de légumes et fruits de Kélibia",
        },
        {
          value: "Marché de gros de légumes et fruits d'El Maâmoura",
          label: "Marché de gros de légumes et fruits d'El Maâmoura",
        },
        {
          value: "Marché de gros de légumes et fruits de Grombalia",
          label: "Marché de gros de légumes et fruits de Grombalia",
        },
        {
          value:
            "Marché de gros de légumes et fruits de Dar Chaâbane El Fehri.",
          label:
            "Marché de gros de légumes et fruits de Dar Chaâbane El Fehri.",
        },
        {
          value: "Marché de gros de légumes et fruits de Béni Khalled.",
          label: "Marché de gros de légumes et fruits de Béni Khalled.",
        },
        {
          value: "Marché de gros de légumes et fruits de Slimane.",
          label: "Marché de gros de légumes et fruits de Slimane.",
        },
        {
          value: "Marché de gros de légumes et fruits de Essomaa",
          label: "Marché de gros de légumes et fruits de Essomaa",
        },
        {
          value: "Marché de gros de légumes et fruits de Azmour.",
          label: "Marché de gros de légumes et fruits de Azmour.",
        },
      ],
    },
    {
      name: t("g_Zaghouan", "gouvernorate"),
      items: [{ value: "Marché de gros", label: "Marché de gros" }],
    },
    {
      name: t("g_Bizerte", "gouvernorate"),
      items: [
        { value: "Marché de gros", label: "Marché de gros" },
        {
          value: "Marché de gros de légumes et fruits de Menzel Bourguiba",
          label: "Marché de gros de légumes et fruits de Ras Jebel",
        },
      ],
    },
    {
      name: t("g_Beja", "gouvernorate"),
      items: [{ value: "Marché de gros", label: "Marché de gros" }],
    },
    {
      name: t("g_Jendouba", "gouvernorate"),
      items: [{ value: "Marché de gros", label: "Marché de gros" }],
    },
    {
      name: t("g_Kef", "gouvernorate"),
      items: [
        {
          value: "Marché de gros de légumes et fruits du Kef",
          label: "Marché de gros de légumes et fruits du Kef",
        },
        {
          value: "Marché de gros de légumes et fruits du Sers",
          label: "Marché de gros de légumes et fruits du Sers",
        },
      ],
    },
    {
      name: t("g_Seliana", "gouvernorate"),
      items: [{ value: "Marché de gros", label: "Marché de gros" }],
    },
    {
      name: t("g_Sousse", "gouvernorate"),

      items: [
        {
          value: "Marché de gros de légumes et fruits de Sidi Bouali",
          label: "Marché de gros de légumes et fruits de Sidi Bouali",
        },
        {
          value: "Marché de gros de légumes et fruits de M'Saken",
          label: "Marché de gros de légumes et fruits de M'Saken",
        },
        {
          value: "Marché de gros de légumes et fruits d'Enfidha",
          label: "Marché de gros de légumes et fruits d'Enfidha",
        },
        {
          value: "Marché de gros de légumes et fruits de Hammam Sousse",
          label: "Marché de gros de légumes et fruits de Hammam Sousse",
        },
      ],
    },
    {
      name: t("g_Monastir", "gouvernorate"),
      items: [
        {
          value: "Marché de gros de légumes et fruits de Monastir",
          label: "Marché de gros de légumes et fruits de Monastir",
        },
        {
          value: "Marché de gros de légumes et fruits de Ksar Hellal",
          label: "Marché de gros de légumes et fruits de Ksar Hellal",
        },
        {
          value: "Marché de gros de légumes et fruits de Jemmel",
          label: "Marché de gros de légumes et fruits de Jemmel",
        },
        {
          value: "Marché de gros de légumes et fruits de Téboulba",
          label: "Marché de gros de légumes et fruits de Téboulba",
        },
        {
          value: "Marché de gros de légumes et fruits de Békalta",
          label: "Marché de gros de légumes et fruits de Békalta",
        },
        {
          value: "Marché de gros de légumes et fruits de Benbla",
          label: "Marché de gros de légumes et fruits de Benbla",
        },
      ],
    },
    {
      name: t("g_Mahdia", "gouvernorate"),
      items: [
        { value: "Marché de gros", label: "Marché de gros" },
        {
          value: " Marché de gros de légumes et fruits de Mahdia",
          label: " Marché de gros de légumes et fruits de Mahdia",
        },
        {
          value: "Marché de gros de légumes et fruits de Ksour Essef",
          label: "Marché de gros de légumes et fruits de Ksour Essef",
        },
        {
          value: "Marché de gros de légumes et fruits de Hiboune",
          label: "Marché de gros de légumes et fruits de Hiboune",
        },
        {
          value: "Marché de gros de légumes et fruits d'El Jem",
          label: "Marché de gros de légumes et fruits d'El Jem",
        },
      ],
    },
    {
      name: t("g_Sfax", "gouvernorate"),
      items: [
        { value: "Marché de gros de Sfax", label: "Marché de gros de Sfax" },
      ],
    },
    {
      name: t("g_Kairouan", "gouvernorate"),
      items: [
        {
          value: " Marché de gros de légumes et fruits de Hajeb El Ayoun",
          label: " Marché de gros de légumes et fruits de Hajeb El Ayoun",
        },
        {
          value: "Marché de gros de légumes et fruits de Bouhajla",
          label: "Marché de gros de légumes et fruits de Bouhajla",
        },
        {
          value: "Marché de gros de légumes et fruits de Sbikha",
          label: "Marché de gros de légumes et fruits de Sbikha",
        },
        {
          value: "Marché de gros de légumes et fruits de Haffouz",
          label: "Marché de gros de légumes et fruits de Haffouz",
        },
        {
          value: "Marché de gros de légumes et fruits de Oueslatia",
          label: "Marché de gros de légumes et fruits de Oueslatia",
        },
        {
          value: "Marché de gros de légumes et fruits de Menzel El M'Hiri",
          label: "Marché de gros de légumes et fruits de Menzel El M'Hiri",
        },
        {
          value: "Marché de gros de légumes et fruits de Nasr Allah",
          label: "Marché de gros de légumes et fruits de Nasr Allah",
        },
        {
          value: "Marché de gros de légumes et fruits de El Ala",
          label: "Marché de gros de légumes et fruits de El Ala",
        },
      ],
    },
    {
      name: t("g_Kasserine", "gouvernorate"),
      items: [
        {
          value: "Marché de gros de légumes et fruits de Kasserine.",
          label: "Marché de gros de légumes et fruits de Kasserine.",
        },
        {
          value: "Marché de gros de légumes et fruits de Sbitla.",
          label: "Marché de gros de légumes et fruits de Sbitla.",
        },
      ],
    },
    {
      name: t("g_SidiBouzid", "gouvernorate"),
      items: [
        {
          value: "Marché de gros de SidiBouzid",
          label: "Marché de gros de SidiBouzid",
        },
      ],
    },
    {
      name: t("g_Gabes", "gouvernorate"),
      items: [
        { value: "Marché de gros de Gabes", label: "Marché de gros de Gabes" },
      ],
    },
    {
      name: t("g_Mednine", "gouvernorate"),
      items: [
        {
          value: " Marché de gros de légumes et fruits de Médenine",
          label: " Marché de gros de légumes et fruits de Médenine",
        },
        {
          value: "Marché de gros de légumes et fruits de Houmet Essouk",
          label: "Marché de gros de légumes et fruits de Houmet Essouk",
        },
        {
          value: "Marché de gros de légumes et fruits de Ben Guerdane",
          label: "Marché de gros de légumes et fruits de Ben Guerdane",
        },

        {
          value: "Marché de gros de légumes et fruits de Zarzis",
          label: "Marché de gros de légumes et fruits de Zarzis",
        },
        {
          value: "Marché de gros de légumes et fruits de Jerba Midoun",
          label: "Marché de gros de légumes et fruits de Jerba Midoun",
        },
      ],
    },
    {
      name: t("g_Tataouin", "gouvernorate"),
      items: [
        {
          value: "Marché de gros Tataouine",
          label: "Marché de gros Tataouine",
        },
      ],
    },
    {
      name: t("g_Gafsa", "gouvernorate"),
      items: [{ value: "Marché de gros Gafsa", label: "Marché de gros Gafsa" }],
    },
    {
      name: t("g_Tozer", "gouvernorate"),
      items: [
        { value: "Marché de gros Tozeur", label: "Marché de gros Tozeur" },
      ],
    },
    {
      name: t("g_Kebili", "gouvernorate"),
      items: [
        {
          value: "Marché de gros de légumes et fruits de Douze",
          label: "Marché de gros de légumes et fruits de Douze",
        },
      ],
    },
  ];

  const handleSelect = (value: string) => {
    console.log("Selected:", value);
    // Do something with the selected value
  };

  return (
    <CategorizedDropdown
      categories={categories}
      placeholder="Select a Market ..."
      emptyText="No Market found."
      searchText="Search Market..."
      onSelect={handleSelect}
    />
  );
}
