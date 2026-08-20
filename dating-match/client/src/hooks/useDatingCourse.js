import { useEffect, useMemo, useState } from "react";
import { fallbackPlaces } from "../data/fallbackPlaces";
import { placeApi } from "../services/placeApi";

export function useDatingCourse() {
  const [places, setPlaces] = useState(fallbackPlaces);
  const [season, setSeason] = useState("summer");
  const [diet, setDiet] = useState("all");
  const [feedback, setFeedback] = useState({});
  const [locked, setLocked] = useState({ 1: true });

  useEffect(() => {
    placeApi
      .getRecommendations({ season, diet })
      .then((data) => setPlaces(data.places))
      .catch(() =>
        setPlaces(
          fallbackPlaces.filter((place) => diet !== "halal" || place.halal),
        ),
      );
  }, [season, diet]);

  const total = useMemo(
    () =>
      places.reduce(
        (result, place) => ({
          min: result.min + place.costMin,
          max: result.max + place.costMax,
        }),
        { min: 0, max: 0 },
      ),
    [places],
  );
  const sendFeedback = (placeId, value) => {
    setFeedback((current) => ({ ...current, [placeId]: value }));
    placeApi.sendFeedback(placeId, value).catch(() => {});
  };
  const movePlace = (index, direction) => {
    const target = index + direction;
    if (target < 0 || target >= places.length || locked[places[index].id])
      return;
    const next = [...places];
    [next[index], next[target]] = [next[target], next[index]];
    setPlaces(next);
  };
  const toggleLock = (id) =>
    setLocked((current) => ({ ...current, [id]: !current[id] }));
  return {
    places,
    season,
    setSeason,
    diet,
    setDiet,
    feedback,
    locked,
    total,
    sendFeedback,
    movePlace,
    toggleLock,
  };
}
