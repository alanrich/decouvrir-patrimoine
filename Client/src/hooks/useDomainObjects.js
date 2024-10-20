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
                  id: object.identifiant,
                  name: formatFrench(object.nom_officiel),
                  address: formatFrench(object.adresse),
                  city: formatFrench(object.ville),
                  genre: formatFrench(object.domaine_thematique),
                  latitude: object.coordonnees.lat,
                  longitude: object.coordonnees.lon,
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
                  id: object.identifiant || object.identifiant_cnm,
                  genre: formatFrench(object.discipline_dominante),
                  name: formatFrench(object.nom_du_festival),
                  address:
                    formatFrench(object.adresse_postale) ||
                    formatFrench(object.nom_de_la_voie),
                  city: formatFrench(object.commune_principale_de_deroulement),
                  latitude: object.geocodage_xy.lat,
                  longitude: object.geocodage_xy.lon,
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
                  id: object.identifiant_deps || object.identifiant_origine,
                  name: formatFrench(object.nom_du_jardin),
                  city: formatFrench(object.commune),
                  region: object.region,
                  department: object.department,
                  genre: formatFrench(object.types.join(", ")),
                  webSite: object.site_internet_et_autres_liens,
                  description: object.description,
                  inauguralYear: object.annee_d_obtention,
                  famousPerson: object.auteur_nom_de_l_illustre,
                  latitude: object.latitude,
                  longitude: object.longitude,
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
                  id: object.identifiant_deps || object.identifiant_origine,
                  name: formatFrench(object.nom),
                  city: formatFrench(object.commune),
                  region: object.region,
                  department: object.department,
                  genre: formatFrench(object.types.join(", ")),
                  address: formatFrench(object.adresse_complete),
                  webSite: object.site_internet_et_autres_liens.join(", "),
                  description: formatFrench(object.description),
                  famousPerson: object.auteur_nom_de_l_illustre,
                  latitude: object.coordonnees_geographiques.lat,
                  longitude: object.coordonnees_geographiques.lon,
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
                  id: object.reference_de_la_notice,
                  name: formatFrench(object.titre_courant),
                  address: formatFrench(object.adresse_normalisee),
                  city: formatFrench(object.commune),
                  genre: Array.isArray(object.denominations)
                    ? formatFrench(object.denominations.join(", "))
                    : "Non disponible",
                  description: object.description_de_l_edifice,
                  historicalDescription: object.description_historique,
                  ancien_nom_commune: object.ancien_nom_commune,
                  constructionCentury:
                    object.siecle_de_la_campagne_principale_de_construction,
                  renovationCentury:
                    object.siecle_de_campagne_secondaire_de_construction,
                  yearCreated: object.datation_de_l_edifice,
                  architect: object.auteur_de_l_edifice,
                  designationDate: object.date_de_label,
                  interestingFacts: object.precisions_sur_l_interet,
                  remarkableElements:
                    object.elements_remarquables_dans_l_edifice,
                  publicOrPrivate: object.statut_juridique_du_proprietaire,
                  structuralMaterial: object.materiaux_du_gros_oeuvre,
                  department: object.departement_en_lettres,
                  region: object.region,
                  latitude: object.coordonnees?.lat,
                  longitude: object.coordonnees?.lon,
                  referencesCadastrales: object.references_cadastrales,
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
                  name: formatFrench(object.name),
                  city: formatFrench(object.ville),
                  genre: formatFrench(object.style_dominant),
                  department: object.department,
                  region: object.region,
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
                  name: formatFrench(object.name),
                  city: formatFrench(object.commune),
                  genre: formatFrench(object.periode_ou_style),
                  style: formatFrench(object.periode_ou_style),
                  type: formatFrench(object.type),
                  proprietaire: formatFrench(object.proprietaire_actuel),
                  region_historique: formatFrench(object.region_historique),
                  region: formatFrench(object.region),
                  department: formatFrench(object.department),
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
                  name: formatFrench(object.name),
                  city: formatFrench(object.lieu),
                  genre: formatFrench(object.type),
                  architect: formatFrench(object.architecte),
                  inauguration: object.inauguration,
                  capacity: object.capacite,
                  webSite: object.site_web,
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
