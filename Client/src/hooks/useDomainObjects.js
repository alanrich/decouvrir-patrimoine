import { useState, useEffect } from "react";
import formatFrench from "../utils/formatFrench";
import { parseJsonField } from "../utils/parseJsonField";

export const useDomainObjects = (
  searchTerm,
  selectedDataSet,
  page,
  rowsPerPage,
  sortBy,
  sortOrder
) => {
  const [domainObjects, setDomainObjects] = useState([]);
  const [totalObjects, setTotalObjects] = useState(0);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = "http://localhost:3001";

  useEffect(() => {
    // Fetch the data from the API
    const fetchData = async () => {
      try {
        let apiUrl = "";
        let sortParam = "";

        if (sortBy && sortBy.length > 0) {
          sortParam = `&sortBy=${sortBy}&sortOrder=${sortOrder}`;
        }

        const searchParam = searchTerm
          ? `&searchTerm=${encodeURIComponent(searchTerm)}`
          : "";

        const constructApiUrl = (endpoint) => {
          return (
            `${API_BASE_URL}/api/${endpoint}?page=${page}` +
            `&rowsPerPage=${rowsPerPage}${sortParam}${searchParam}`
          );
        };

        // Add API URLs for new datasets
        if (selectedDataSet === "museums") {
          apiUrl = constructApiUrl("museums");
        } else if (selectedDataSet === "festivals") {
          apiUrl = constructApiUrl("festivals");
        } else if (selectedDataSet === "jardins") {
          apiUrl = constructApiUrl("jardins");
        } else if (selectedDataSet === "maisonsDesIllustres") {
          apiUrl = constructApiUrl("maisons-des-illustres");
        } else if (selectedDataSet === "architectureContemporaines") {
          apiUrl = constructApiUrl("architectures");
        } else if (selectedDataSet === "cathedrals") {
          apiUrl = constructApiUrl("cathedrals");
        } else if (selectedDataSet === "chateaux") {
          apiUrl = constructApiUrl("castles");
        } else if (selectedDataSet === "operaHouses") {
          apiUrl = constructApiUrl("operas");
        }

        const response = await fetch(apiUrl, {
          method: "GET",
          mode: "cors",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "x-requested-with": "XMLHttpRequest",
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }

        const result = await response.json();
        const data = result.data;

        const validData = data
          .map((object) => {
            if (selectedDataSet === "museums") {
              // Museums object mapping
              if (
                object.nom_officiel &&
                object.adresse &&
                object.ville &&
                object.coordonnees &&
                typeof object.coordonnees.lat === "number" &&
                typeof object.coordonnees.lon === "number"
              ) {
                return {
                  id: object.identifiant || "Non disponible",
                  name: formatFrench(object.nom_officiel) || "Non disponible",
                  address: formatFrench(object.adresse) || "Non disponible",
                  city: formatFrench(object.ville) || "Non disponible",
                  genre:
                    formatFrench(object.domaine_thematique) || "Non disponible",
                  latitude: object.coordonnees.lat || null,
                  longitude: object.coordonnees.lon || null,
                  dataSet: selectedDataSet,
                };
              }
            }

            if (selectedDataSet === "festivals") {
              // Festivals object mapping
              if (
                object.nom_du_festival &&
                typeof object.commune_principale_de_deroulement === "string" &&
                object.geocodage_xy &&
                typeof object.geocodage_xy.lat === "number" &&
                typeof object.geocodage_xy.lon === "number"
              ) {
                return {
                  id:
                    object.identifiant ||
                    object.identifiant_cnm ||
                    "Non disponible",
                  genre:
                    formatFrench(object.discipline_dominante) ||
                    "Non disponible",
                  name:
                    formatFrench(object.nom_du_festival) || "Non disponible",
                  address:
                    formatFrench(object.adresse_postale) ||
                    formatFrench(object.nom_de_la_voie) ||
                    "Non disponible",
                  city:
                    formatFrench(object.commune_principale_de_deroulement) ||
                    "Non disponible",
                  latitude: object.geocodage_xy.lat || null,
                  longitude: object.geocodage_xy.lon || null,
                  dataSet: selectedDataSet,
                };
              }
            }

            if (selectedDataSet === "jardins") {
              // Jardins object mapping
              if (
                object.nom_du_jardin &&
                object.commune &&
                object.coordonnees_geographiques &&
                typeof object.coordonnees_geographiques.lat === "number" &&
                typeof object.coordonnees_geographiques.lon === "number"
              ) {
                return {
                  id:
                    object.identifiant_deps ||
                    object.identifiant_origine ||
                    "Non disponible",
                  name: formatFrench(object.nom_du_jardin) || "Non disponible",
                  city: formatFrench(object.commune) || "Non disponible",
                  region: object.region || "Non disponible",
                  department: object.department || "Non disponible",
                  genre:
                    formatFrench(object.types.join(", ")) || "Non disponible",
                  webSite:
                    object.site_internet_et_autres_liens || "Non disponible",
                  description: object.description || "Non disponible",
                  inauguralYear: object.annee_d_obtention || "Non disponible",
                  famousPerson:
                    object.auteur_nom_de_l_illustre || "Non disponible",
                  latitude: object.latitude || null,
                  longitude: object.longitude || null,
                  dataSet: selectedDataSet,
                };
              }
            }

            if (selectedDataSet === "maisonsDesIllustres") {
              // Maisons des Illustres object mapping
              if (
                object.nom &&
                object.commune &&
                object.coordonnees_geographiques &&
                typeof object.coordonnees_geographiques.lat === "number" &&
                typeof object.coordonnees_geographiques.lon === "number"
              ) {
                const siteInternet = parseJsonField(
                  object.site_internet_et_autres_liens
                );
                const accessibleAuPublic = parseJsonField(
                  object.accessible_au_public
                );
                const types = parseJsonField(object.types);

                return {
                  id:
                    object.identifiant_deps ||
                    object.identifiant_origine ||
                    "Non disponible",
                  name: formatFrench(object.nom) || "Non disponible",
                  city: formatFrench(object.commune) || "Non disponible",
                  region: object.region || "Non disponible",
                  department: object.department || "Non disponible",
                  genre:
                    formatFrench(object.types.join(", ")) || "Non disponible",
                  address:
                    formatFrench(object.adresse_complete) || "Non disponible",
                  webSite:
                    object.site_internet_et_autres_liens.join(", ") ||
                    "Non disponible",
                  description:
                    formatFrench(object.description) || "Non disponible",
                  famousPerson:
                    object.auteur_nom_de_l_illustre || "Non disponible",
                  latitude: object.coordonnees_geographiques.lat || null,
                  longitude: object.coordonnees_geographiques.lon || null,
                  dataSet: selectedDataSet,
                };
              }
            }

            if (selectedDataSet === "architectureContemporaines") {
              // Architecture Contemporaine object mapping
              if (
                object.titre_courant &&
                object.commune &&
                object.coordonnees
              ) {
                return {
                  id: object.reference_de_la_notice || "Non disponible",
                  name: formatFrench(object.titre_courant) || "Non disponible",
                  address:
                    formatFrench(object.adresse_normalisee) || "Non disponible",
                  city: formatFrench(object.commune) || "Non disponible",
                  genre: Array.isArray(object.denominations)
                    ? formatFrench(object.denominations.join(", "))
                    : "Non disponible",
                  description:
                    object.description_de_l_edifice || "Non disponible",
                  historicalDescription:
                    object.description_historique || "Non disponible",
                  ancien_nom_commune:
                    object.ancien_nom_commune || "Non disponible",
                  constructionCentury:
                    object.siecle_de_la_campagne_principale_de_construction ||
                    "Non disponible",
                  renovationCentury:
                    object.siecle_de_campagne_secondaire_de_construction ||
                    "Non disponible",
                  yearCreated: object.datation_de_l_edifice || "Non disponible",
                  architect: object.auteur_de_l_edifice || "Non disponible",
                  designationDate: object.date_de_label || "Non disponible",
                  interestingFacts:
                    object.precisions_sur_l_interet || "Non disponible",
                  remarkableElements:
                    object.elements_remarquables_dans_l_edifice ||
                    "Non disponible",
                  publicOrPrivate:
                    object.statut_juridique_du_proprietaire || "Non disponible",
                  structuralMaterial:
                    object.materiaux_du_gros_oeuvre || "Non disponible",
                  department: object.departement_en_lettres || "Non disponible",
                  region: object.region || "Non disponible",
                  latitude: object.coordonnees?.lat || null,
                  longitude: object.coordonnees?.lon || null,
                  referencesCadastrales:
                    object.references_cadastrales || "Non disponible",
                  dataSet: selectedDataSet,
                };
              }
            }

            if (selectedDataSet === "cathedrals") {
              // Cathedral object mapping
              if (object.name && object.ville) {
                // dataset is not huge, dont exclude objects lacking geocoords
                return {
                  id: object.id,
                  name: formatFrench(object.name) || "Non disponible",
                  city: formatFrench(object.ville) || "Non disponible",
                  genre:
                    formatFrench(object.style_dominant) || "Non disponible",
                  department: object.department || "Non disponible",
                  webSite: object.site_web || "Non disponible",
                  region: object.region || "Non disponible",
                  latitude: object.coordonnes?.latitude || null,
                  longitude: object.coordonnes?.longitude || null,
                  dataSet: selectedDataSet,
                };
              }
            }

            if (selectedDataSet === "chateaux") {
              // Chateaux object mapping
              if (object.name && object.commune) {
                return {
                  id: object.id,
                  name: formatFrench(object.name) || "Non disponible",
                  city: formatFrench(object.commune) || "Non disponible",
                  genre:
                    formatFrench(object.periode_ou_style) || "Non disponible",
                  style:
                    formatFrench(object.periode_ou_style) || "Non disponible",
                  type: formatFrench(object.type) || "Non disponible",
                  proprietaire:
                    formatFrench(object.proprietaire_actuel) ||
                    "Non disponible",
                  region_historique:
                    formatFrench(object.region_historique) || "Non disponible",
                  region: formatFrench(object.region) || "Non disponible",
                  department:
                    formatFrench(object.department) || "Non disponible",
                  latitude: object.coordonnes?.latitude || null,
                  longitude: object.coordonnes?.longitude || null,
                  dataSet: selectedDataSet,
                };
              }
            }

            if (selectedDataSet === "operaHouses") {
              // Opera House object mapping
              if (object.name && object.lieu) {
                return {
                  id: object.id,
                  name: formatFrench(object.name) || "Non disponible",
                  city: formatFrench(object.lieu) || "Non disponible",
                  genre: formatFrench(object.type) || "Non disponible",
                  architect:
                    formatFrench(object.architecte) || "Non disponible",
                  inauguration: object.inauguration || "Non disponible",
                  capacity: object.capacite || "Non disponible",
                  webSite: object.site_web || "Non disponible",
                  latitude: object.coordonnees?.latitude || null,
                  longitude: object.coordonnees?.longitude || null,
                  dataSet: selectedDataSet,
                };
              }
            }

            return null;
          })
          .filter(Boolean); // Remove any null entries

        setDomainObjects(validData);
        setTotalObjects(result.total);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data from API:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [searchTerm, selectedDataSet, page, rowsPerPage, sortBy, sortOrder]);

  return { domainObjects, totalObjects, loading };
};
