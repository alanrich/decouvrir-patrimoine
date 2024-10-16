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
            `/api/${endpoint}?page=${page}` +
            `&rowsPerPage=${rowsPerPage}${sortParam}${searchParam}`
          );
        };

        if (selectedDataSet === "museums") {
          apiUrl = constructApiUrl("museums");
        } else if (selectedDataSet === "festivals") {
          apiUrl = constructApiUrl("festivals");
        } else if (selectedDataSet === "jardins") {
          apiUrl = constructApiUrl("jardins");
        } else if (selectedDataSet === "maisonsDesIllustres") {
          apiUrl = constructApiUrl("maisons-des-illustres");
        } else if (selectedDataSet === "architectureContemporaines") {
          apiUrl = constructApiUrl("architecture-contemporaines");
        }

        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }

        const result = await response.json();
        const data = result.data;

        // Validate the data based on the selected data set
        const validData = data
          .map((object) => {
            if (selectedDataSet === "museums") {
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
                  address: formatFrench(object.adresse) || "Non disponible",
                  city: formatFrench(object.ville),
                  genre:
                    formatFrench(object.domaine_thematique) || "Non disponible",
                  latitude: object.coordonnees.lat,
                  longitude: object.coordonnees.lon,
                  rawData: object,
                  dataSet: selectedDataSet,
                };
              }
            }
            if (selectedDataSet === "festivals") {
              if (
                object.nom_du_festival &&
                typeof object.commune_principale_de_deroulement === "string" &&
                object.geocodage_xy &&
                typeof object.geocodage_xy.lat === "number" &&
                typeof object.geocodage_xy.lon === "number"
              ) {
                return {
                  id: object.identifiant || object.identifiant_cnm,
                  genre:
                    formatFrench(object.discipline_dominante) ||
                    "Non disponible",
                  name: formatFrench(object.nom_du_festival),
                  address:
                    formatFrench(object.adresse_postale) ||
                    formatFrench(object.nom_de_la_voie) ||
                    "Non disponible",
                  city:
                    formatFrench(object.commune_principale_de_deroulement) ||
                    "Non disponible",
                  latitude: object.geocodage_xy.lat,
                  longitude: object.geocodage_xy.lon,
                  rawData: object,
                  dataSet: selectedDataSet,
                };
              }
            }
            if (selectedDataSet === "jardins") {
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
                  genre:
                    formatFrench(object.types.join(", ")) || "Non disponible",
                  latitude: object.coordonnees_geographiques.lat,
                  longitude: object.coordonnees_geographiques.lon,
                  rawData: object,
                  dataSet: selectedDataSet,
                };
              }
            }
            if (selectedDataSet === "maisonsDesIllustres") {
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
                  genre:
                    formatFrench(object.types.join(", ")) || "Non disponible",
                  latitude: object.coordonnees_geographiques.lat,
                  longitude: object.coordonnees_geographiques.lon,
                  rawData: {
                    ...object,
                    site_internet_et_autres_liens: siteInternet,
                    accessible_au_public: accessibleAuPublic,
                    types: types,
                  },
                  dataSet: selectedDataSet,
                };
              }
            }
            if (selectedDataSet === "architectureContemporaines") {
              if (
                object.titre_courant &&
                object.commune &&
                object.coordonnees &&
                typeof object.coordonnees.lat === "number" &&
                typeof object.coordonnees.lon === "number"
              ) {
                return {
                  id: object.reference_de_la_notice,
                  name: formatFrench(object.titre_courant),
                  address:
                    formatFrench(object.adresse_normalisee) || "Non disponible",
                  city: formatFrench(object.commune),
                  genre: Array.isArray(object.denominations)
                    ? formatFrench(object.denominations.join(", "))
                    : "Non disponible",
                  latitude: object.coordonnees.lat,
                  longitude: object.coordonnees.lon,
                  rawData: object,
                  dataSet: selectedDataSet,
                };
              }
            }
            return null; // Exclude any invalid data
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
