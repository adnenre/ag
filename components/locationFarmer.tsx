import { CategorizedDropdown } from "@/components/ui/CategorizedDropdown";
import { useLanguage } from "@/contexts/language-context";
export function LocationFarmer() {
  const { t } = useLanguage();
  const categories = [
    {
      name: t("g_Tunis", "gouvernorate"),
      items: [
        { value: "la Marsa", label: "la marsa" },
        { value: "El bouhaira", label: "El bouhaira" },
        { value: "Cité el Khadra", label: "Cité el Khadra" },
        { value: "El Manzah", label: "El Manzah" },
        { value: "El Omran", label: "El Omran" },
        { value: "El Omran Supérieur", label: "El Omran Supérieur" },
        { value: "Cité Etahrir", label: "Cité Etahrir" },
        { value: "Bardo", label: "bardo" },
        { value: "El Haria", label: "El Haria" },
        { value: "Sabket Sijoumi", label: "Sabket Sijoumi" },
        { value: "Sidi Hassine", label: "Sidi Hassine" },
        { value: "El Wardia", label: "El Wardia" },
        { value: "Jbal Jloud", label: "Jbal Jloud" },
        { value: "El Kabaria", label: "El Kabaria" },
      ],
    },
    {
      name: t("g_Ariana", "gouvernorate"),
      items: [{ value: "Ariana", label: "Ariana" }],
    },
    {
      name: t("g_Ben_Arous", "gouvernorate"),
      items: [{ value: "Ben Arous", label: "Ben Arous" }],
    },
    {
      name: t("g_Manouba", "gouvernorate"),
      items: [{ value: "Manouba", label: "Manouba" }],
    },
    {
      name: t("g_Nabeul", "gouvernorate"),

      items: [
        {
          value: "Takelsa",
          label: "Takelsa",
        },
        {
          value: "Haouaria",
          label: "Haouaria",
        },
        {
          value: "hamam laghzaz",
          label: "hamam laghzaz",
        },
        { value: "El Mida", label: "El Mida" },
        { value: "Korba", label: "Korba" },
        {
          value: "Kelibia",
          label: "Kelibia",
        },
        {
          value: "Manzel Temime",
          label: "Manzel Temime",
        },
        {
          value: "Beni Khiare",
          label: "Beni Khiare",
        },
        {
          value: "Dar chaabane",
          label: "Dar chaabane",
        },
        {
          value: "Nabeul",
          label: "Nabeul",
        },
        {
          value: "Bouargoube",
          label: "Bouargoube",
        },
        {
          value: "Grombalia",
          label: "Grombalia",
        },
        {
          value: "Hammamet",
          label: "Hammamet",
        },
        {
          value: "Soliman",
          label: "Soliman",
        },
        {
          value: "Manzel Bouzalfa",
          label: "Manzel Bouzalfa",
        },
        {
          value: "Beni Khalled",
          label: "Beni Khalled",
        },
      ],
    },
    {
      name: t("g_Zaghouan", "gouvernorate"),
      items: [{ value: "Zaghouan", label: "Zaghouan" }],
    },
    {
      name: t("g_Bizerte", "gouvernorate"),
      items: [
        { value: "Sejnane", label: "Sejnane" },
        { value: "Ghezala", label: "Ghezala" },
        { value: "Mateur", label: "Mateur" },
        { value: "Joumine", label: "Joumine" },
        { value: "Utique", label: "Utique" },
        { value: "Menzel Bourguiba", label: "Menzel Bourguiba" },
        { value: "El Alia", label: "El Alia" },
        { value: "Ghar el melh", label: "Ghar el melh" },
        { value: "Ras el jabel", label: "Ras el jabel" },
        { value: "Menzel jemil", label: "Menzel jemil" },
        { value: "Jarzouna", label: "Jarzouna" },
        { value: "Tinja", label: "Tinja" },
        { value: "Bizerte Nord", label: "Bizerte Nord" },
        { value: "Bizerte Sud", label: "Bizerte Sud" },
      ],
    },
    {
      name: t("g_Beja", "gouvernorate"),
      items: [
        { value: "Nefza", label: "Nefza" },
        { value: "Amdoun", label: "Amdoun" },
        { value: "Beja Nord", label: "Beja Nord" },
        { value: "Beja Sud", label: "Beja Sud" },
        { value: "Testour", label: "Testour" },
        { value: "Mjaz el Bab", label: "Mjaz el Bab" },
        { value: "Goubellat", label: "Goubellat" },
        { value: "Amdoun", label: "Amdoun" },
        { value: "Thibar", label: "Thibar" },
        { value: "Teboursouk", label: "Teboursouk" },
      ],
    },
    {
      name: t("g_Jendouba", "gouvernorate"),
      items: [
        { value: "Tabarka", label: "Tabarka" },
        { value: "Ain Draham", label: "Ain Draham" },
        { value: "Fernana", label: "Fernana" },
        { value: "Balta Bouawene", label: "Balta Bouawene" },
        { value: "Bousalem", label: "Bousalem" },
        { value: "Jendouba", label: "Jendouba" },
        { value: "Oued meliz", label: "Oued meliz" },
        { value: "Ghardimaou", label: "Ghardimaou" },
        { value: "Jendouba nord", label: "Jendouba nord" },
      ],
    },
    {
      name: t("g_Kef", "gouvernorate"),
      items: [
        { value: "Nebeur", label: "Nebeur" },
        { value: "Sakiet Sidi youssef", label: "Sakiet Sidi youssef" },
        { value: "Kef Ouest", label: "Kef Ouest" },
        { value: "Kef Est", label: "Kef Est" },
        { value: "Tajerouine", label: "Tajerouine" },
        { value: "Dahmani", label: "Dahmani" },
        { value: "Essers", label: "Essers" },
        { value: "Ksour", label: "Ksour" },
        { value: "Jerissa", label: "Jerissa" },
        { value: "Kalaat Khasba", label: "Kalaat Khasba" },
        { value: "Kalaat Senane", label: "Kalaat Senane" },
      ],
    },
    {
      name: t("g_Seliana", "gouvernorate"),
      items: [
        { value: "El Aroussa", label: "El Aroussa" },
        { value: "Bou Arada", label: "Bou Arada" },
        { value: "Gaafour", label: "Gaafour" },
        { value: "El Krib", label: "El Krib" },
        { value: "Bou Rouis", label: "Bou Rouis" },
        { value: "Siliana nord", label: "Siliana nord" },
        { value: "Bargou", label: "Bargou" },
        { value: "Siliana sud", label: "Siliana sud" },
        { value: "Makthar", label: "Makthar" },
        { value: "Kesra", label: "Kesra" },
        { value: "Rouhia", label: "Rouhia" },
      ],
    },
    {
      name: t("g_Sousse", "gouvernorate"),

      items: [
        {
          value: "Hergla",
          label: "Hergla",
        },
        {
          value: "Sidi Bou Ali",
          label: "Sidi Bou Ali",
        },
        {
          value: "Akouda",
          label: "Akouda",
        },
        {
          value: "Hammam Sousse",
          label: "Hammam Sousse",
        },
        {
          value: "Sousse Ville",
          label: "Sousse Ville",
        },
        {
          value: "Sousse Jawhara",
          label: "Sousse Jawhara",
        },
        {
          value: "Sidi abdelhamid",
          label: "Sidi abdelhamid",
        },
        {
          value: "Zaouia ksiba et thrayet",
          label: "Zaouia ksiba et thrayet",
        },
        {
          value: "Msaken",
          label: "Msaken",
        },
        {
          value: "Sabkhet Sidi et Heni",
          label: "Sabkhet Sidi et Heni",
        },
        {
          value: "Sidi el Heni",
          label: "Sidi el Heni",
        },
        {
          value: "Kala sghira",
          label: "Kala sghira",
        },
        {
          value: "Kalaa Kebira",
          label: "Kalaa Kebira",
        },
        {
          value: "Kondar",
          label: "Kondar",
        },
        {
          value: "Sabkhet el Kalbia",
          label: "Sabkhet el Kalbia",
        },
        {
          value: "Sidi el Heni",
          label: "Sidi el Heni",
        },
      ],
    },
    {
      name: t("g_Monastir", "gouvernorate"),
      items: [
        {
          value: "Sahline",
          label: "Sahline",
        },
        {
          value: "Monastir",
          label: "Monastir",
        },
        {
          value: "Ouerdanine",
          label: "Ouerdanine",
        },
        {
          value: "Jammel",
          label: "Jammel",
        },
        {
          value: "Zermadine",
          label: "Zermadine",
        },
        {
          value: "Beni Hassen",
          label: "Beni Hassen",
        },
        {
          value: "Moknine",
          label: "Moknine",
        },
        {
          value: "Bekalta",
          label: "Bekalta",
        },
        {
          value: "Teboulba",
          label: "Teboulba",
        },
        {
          value: "Ksar hella",
          label: "Ksar hella",
        },
        {
          value: "Ksibet el mediouni",
          label: "Ksibet el mediouni",
        },
        {
          value: "Jammel",
          label: "Jammel",
        },
        {
          value: "Zeramdine",
          label: "Zeramdine",
        },
        {
          value: "Ksibet el mediouni",
          label: "Ksibet el mediouni",
        },
        {
          value: "Sayada",
          label: "Sayada",
        },
        {
          value: "Lamta",
          label: "Lamta",
        },
        {
          value: "Bouhjar",
          label: "Bouhjar",
        },
        {
          value: "Jammel",
          label: "Jammel",
        },
        {
          value: "Zeramdine",
          label: "Zeramdine",
        },
        {
          value: "Bembla",
          label: "Bembla",
        },
      ],
    },
    {
      name: t("g_Mahdia", "gouvernorate"),
      items: [
        { value: "Mahdia", label: "Mahdia" },
        { value: "Ksour Essaf", label: "Ksour Essaf" },
        { value: "Chebba", label: "Chebba" },
        { value: "Melloulech", label: "Melloulech" },
        { value: "Sidi alouane", label: "Sidi alouane" },
        { value: "Boumerdes", label: "Boumerdes" },
        { value: "El Jem", label: "El Jem" },
        { value: "Essouassi", label: "Essouassi" },
        { value: "Chorbane", label: "Chorbane" },
        { value: "Ouled chamekh", label: "Ouled chamekh" },
        { value: "Hbira", label: "Hbira" },
      ],
    },
    {
      name: t("g_Sfax", "gouvernorate"),
      items: [
        { value: "Sfax sud", label: "Sfax sud" },
        { value: "El Amra", label: "El Amra" },
        { value: "Jebeniana", label: "Jebeniana" },
        { value: "El Hancha", label: "El Hancha" },
        { value: "Menzel chaker", label: "Menzel chaker" },
        { value: "Agareb", label: "Agareb" },
        { value: "Mahres", label: "Mahres" },
        { value: "Ghraiba", label: "Ghraiba" },
        { value: "Skhira", label: "Skhira" },
        { value: "Bir ali ben Khelifa", label: "Bir ali ben Khelifa" },
        { value: "Sakiet ezzit", label: "Sakiet ezzit" },
        { value: "Sakiet eddaier", label: "Sakiet eddaier" },
        { value: "Karkennah", label: "Karkennah" },
      ],
    },
    {
      name: t("g_Kairouan", "gouvernorate"),
      items: [
        {
          value: "Oueslatia",
          label: "Oueslatia",
        },
        {
          value: "Sbikha",
          label: "Sbikha",
        },
        {
          value: "Ain Jeloula",
          label: "Ain Jeloula",
        },
        {
          value: "Elalaa",
          label: "Elalaa",
        },
        {
          value: "Haffouz",
          label: "Haffouz",
        },
        {
          value: "Chébika",
          label: "Chébika",
        },
        {
          value: "Kairouan Sud",
          label: "Kairouan Sud",
        },
        {
          value: "Hajab El Ayoun",
          label: "Hajab El Ayoun",
        },
        { value: "Menzel El Mhiri", label: "Menzel El Mhiri" },
        { value: "Bouhajla", label: "Bouhajla" },
        { value: "Chrarda", label: "Chrarda" },
        { value: "Nasrallah", label: "Nasrallah" },
      ],
    },
    {
      name: t("g_Kasserine", "gouvernorate"),
      items: [
        { value: "Hidra", label: "Hidra" },
        { value: "Thala", label: "Thala" },
        { value: "Jedliane", label: "Jedliane" },
        { value: "El Ayoun", label: "El Ayoun" },
        { value: "Sbiba", label: "Sbiba" },
        { value: "Foussana", label: "Foussana" },
        { value: "Sbeitla", label: "Sbeitla" },
        { value: "Kasserine Nord", label: "Kasserine Nord" },
        { value: "Kasserine Sud", label: "Kasserine Sud" },
        { value: "Feriana", label: "Feriana" },
        { value: "Hassi El Ferid", label: "Hassi El Ferid" },
        { value: "Mejel Bel Abess", label: "Mejel Bel Abess" },
      ],
    },
    {
      name: t("g_SidiBouzid", "gouvernorate"),
      items: [
        { value: "Mezzouna", label: "Mezzouna" },
        { value: "Meknassy", label: "Meknassy" },
        { value: "Menzel bouzaiane", label: "Menzel bouzaiane" },
        { value: "Regueb", label: "Regueb" },
        { value: "Souk jedid", label: "Souk jedid" },
        { value: "Ben oun", label: "Ben oun" },
        { value: "Bir el haffay", label: "Bir el haffay" },
        { value: "Sidi bouzid Ouest", label: "Sidi bouzid Ouest" },
        { value: "Sidi bouzid Est", label: "Sidi bouzid Est" },
        { value: "Ouled Hafouzz", label: "Ouled Hafouzz" },
        { value: "Jelma", label: "Jelma" },
        { value: "Cebkhat ouled askar", label: "Cebkhat ouled askar" },
      ],
    },
    {
      name: t("g_Gabes", "gouvernorate"),
      items: [
        { value: "Matmata", label: "Matmata" },
        { value: "Nouvelle Matmata", label: "Nouvelle Matmata" },
        { value: "Mareth", label: "Mareth" },
        { value: "Gabes Sud", label: "Gabes Sud" },
        { value: "Gabes Ouest", label: "Gabes Ouest" },
        { value: "Gabes Ville", label: "Gabes Ville" },
        { value: "Ghannouche", label: "Ghannouche" },
        { value: "El Metouia", label: "El Metouia" },
        { value: "Menzel el Habib", label: "Menzel el Habib" },
        { value: "El Hamma", label: "El Hamma" },
      ],
    },
    {
      name: t("g_Mednine", "gouvernorate"),
      items: [
        { value: "Ben Guerdane", label: "Ben Guerdane" },
        { value: "Zarzis", label: "Zarzis" },
        { value: "Medenine Sud", label: "Medenine Sud" },

        { value: "Sidi Makhlouf", label: "Sidi Makhlouf" },
        { value: "Medenine Nord", label: "Medenine Nord" },
        { value: "Beni Khedech", label: "Beni Khedech" },
      ],
    },
    {
      name: t("g_Tataouin", "gouvernorate"),
      items: [
        { value: "Remada", label: "Remada" },
        { value: "Dhehiba", label: "Dhehiba" },
        { value: "Tataouine Nord", label: "Tataouine Nord" },
        { value: "Tataouine sud", label: "Tataouine sud" },
        { value: "Ghomrassen", label: "Ghomrassen" },
        { value: "Bir Lahmar", label: "Bir Lahmar" },
      ],
    },
    {
      name: t("g_Gafsa", "gouvernorate"),
      items: [
        { value: "Sidi Aiech", label: "Sidi Aiech" },
        { value: "E-Snad", label: "E-Snad" },
        { value: "El guetar", label: "El guetar" },
        { value: "Gafsa Nord", label: "Gafsa Nord" },
        { value: "Gafsa Sud", label: "Gafsa Sud" },
        { value: "Gafsa Nord", label: "Gafsa Nord" },
        { value: "El Ksar", label: "El Ksar" },
        { value: "El Mdhila", label: "El Mdhila" },
        { value: "Metlaoui", label: "Metlaoui" },
        { value: "Redayef", label: "Redayef" },
        { value: "Om el arayes", label: "Om el arayes" },
      ],
    },
    {
      name: t("g_Tozer", "gouvernorate"),
      items: [
        { value: "Tamaghza", label: "Tamaghza" },
        { value: "Dagach", label: "Dagach" },
        { value: "Tozeur", label: "Tozeur" },
        { value: "Nafta", label: "Nafta" },
        { value: "Hazoua", label: "Hazoua" },
      ],
    },
    {
      name: t("g_Kebili", "gouvernorate"),
      items: [
        { value: "Souk El Ahed", label: "Souk El Ahed" },
        { value: "Kebili Nord", label: "Kebili Nord" },
        { value: "Kebili Sud", label: "Kebili Sud" },

        { value: "Douz Nord", label: "Douz Nord" },
        { value: "Douz Sud", label: "Douz Sud" },
        { value: "EL Fouar", label: "El Fouar" },
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
      placeholder="Select an adress ..."
      emptyText="No Adress found."
      searchText="Search Adress..."
      onSelect={handleSelect}
    />
  );
}
