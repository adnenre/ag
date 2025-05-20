import { CategorizedDropdown } from "@/components/ui/CategorizedDropdown";
import { useLanguage } from "@/contexts/language-context";
import LocationDropdown from "./LocationDropdown";
import { useRegistrationContext } from "@/contexts/RegistrationContext";
import type { FC } from "react";

interface LocationDropdownProps {
  onValueChange: (value: string) => void;
}
export const LocationFarmer: FC<LocationDropdownProps> = ({
  onValueChange,
}) => {
  const { t } = useLanguage();

  const { formData } = useRegistrationContext();
  console.log(formData);
  const farmerLocations = [
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
          value: "Zeramdine",
          label: "Zeramdine",
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

  const agentLocations = [
    {
      name: t("g_Tunis", "gouvernorate"),
      items: [
        { value: "Marché de gros de Tunis", label: "Marché de gros de Tunis" },
      ],
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

  return (
    <CategorizedDropdown
      categories={
        formData.userType === "farmer" ? farmerLocations : agentLocations
      }
      placeholder="Select an adress ..."
      emptyText="No Adress found."
      searchText="Search Adress..."
      onSelect={onValueChange}
    />
  );
};
