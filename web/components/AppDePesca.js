"use client";

import { useCallback, useRef, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import PhoneFrame from "@/components/PhoneFrame";
import { Icon, ICON } from "@/lib/icons";
import {
  NO_NAV_SCREENS,
  SCREEN_TITLES,
  SUB_LOCATION_SCREENS,
  TAB_FOR_SCREEN,
} from "@/lib/data";

import { SplashScreen, OnboardingScreen, PermissionScreen, LocationScreen } from "@/components/screens/EntryScreens";
import { HomeScreen, ConditionsScreen, ForecastScreen, DayDetailScreen } from "@/components/screens/HomeScreens";
import { WindScreen, SeaScreen, TideScreen } from "@/components/screens/WindSeaTideScreens";
import { AlertsScreen, AlertDetailScreen } from "@/components/screens/AlertScreens";
import { SpeciesScreen, SpeciesDetailScreen } from "@/components/screens/SpeciesScreens";
import { CalendarScreen, DefesoScreen } from "@/components/screens/CalendarScreens";
import { MoreScreen, SettingsScreen, FavLocationsScreen, ErrorScreen } from "@/components/screens/MoreScreens";

export default function AppDePesca() {
  const [screen, setScreen] = useState("splash");
  const [history, setHistory] = useState([]);
  const [scenario, setScenario] = useState("favoravel");
  const [offline, setOffline] = useState(false);
  const [location, setLocation] = useState({ city: "Balneário Piçarras", uf: "SC" });
  const [locationDenied, setLocationDenied] = useState(false);
  const [selectedSpecies, setSelectedSpecies] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedAlert, setSelectedAlert] = useState(null);

  const scrollRef = useRef(null);
  const scrollTop = useCallback(() => {
    requestAnimationFrame(() => {
      if (scrollRef.current) scrollRef.current.scrollTop = 0;
    });
  }, []);

  const go = useCallback(
    (next) => {
      setHistory((h) => [...h, screen]);
      setScreen(next);
      scrollTop();
    },
    [screen, scrollTop]
  );

  const goTab = useCallback(
    (next) => {
      setHistory([]);
      setScreen(next);
      scrollTop();
    },
    [scrollTop]
  );

  const back = useCallback(() => {
    setHistory((h) => {
      if (!h.length) {
        setScreen("home");
        return h;
      }
      const copy = [...h];
      const prev = copy.pop();
      setScreen(prev);
      return copy;
    });
    scrollTop();
  }, [scrollTop]);

  const selectCity = useCallback(
    (c) => {
      setLocation({ city: c.name, uf: "SC" });
      setScenario(c.rating === "naoRecomendado" ? "naoRecomendado" : c.rating);
      setHistory([]);
      setScreen("home");
      scrollTop();
    },
    [scrollTop]
  );

  const allowLocation = useCallback(() => {
    setLocationDenied(false);
    goTab("home");
  }, [goTab]);

  const denyLocation = useCallback(() => {
    setLocationDenied(true);
    setHistory([]);
    setScreen("location");
    scrollTop();
  }, [scrollTop]);

  const openDay = useCallback(
    (d) => {
      setSelectedDay(d);
      go("dayDetail");
    },
    [go]
  );
  const openSpecies = useCallback(
    (sp) => {
      setSelectedSpecies(sp);
      go("speciesDetail");
    },
    [go]
  );
  const openAlert = useCallback(
    (a) => {
      setSelectedAlert(a);
      go("alertDetail");
    },
    [go]
  );

  const nav = {
    go,
    goTab,
    back,
    goFav: () => go("favLocations"),
  };

  const showNav = !NO_NAV_SCREENS.includes(screen);
  const showStdHeader = Object.prototype.hasOwnProperty.call(SCREEN_TITLES, screen);
  const activeTab = TAB_FOR_SCREEN[screen] || "";
  const headerSub = SUB_LOCATION_SCREENS.includes(screen) ? `${location.city}, ${location.uf}` : "";

  const headerTitle =
    screen === "dayDetail"
      ? (selectedDay && selectedDay.day) || "Detalhe do dia"
      : screen === "speciesDetail"
      ? (selectedSpecies && selectedSpecies.name) || "Espécie"
      : SCREEN_TITLES[screen] || "";

  const darkStatusBar = screen === "splash" || screen === "home";

  function renderScreen() {
    switch (screen) {
      case "splash":
        return <SplashScreen onFinish={() => go("onboarding")} />;
      case "onboarding":
        return <OnboardingScreen onSkip={() => goTab("home")} onNext={() => go("permission")} />;
      case "permission":
        return <PermissionScreen onAllow={allowLocation} onManual={() => go("location")} onDeny={denyLocation} />;
      case "location":
        return (
          <LocationScreen
            hasBack={history.length > 0}
            onBack={back}
            denied={locationDenied}
            onSelectCity={selectCity}
            onUseGps={allowLocation}
          />
        );
      case "home":
        return (
          <HomeScreen
            scenario={scenario}
            location={location}
            hasAlert={false}
            onOpenLocation={() => go("location")}
            onRefresh={scrollTop}
            onGoAlerts={() => go("alerts")}
            onGoForecast={() => go("forecast")}
            onGoConditions={() => go("conditions")}
            onGoWind={() => go("wind")}
            onGoSea={() => go("sea")}
            onGoTide={() => go("tide")}
            onOpenDay={openDay}
            onGoSpecies={() => goTab("species")}
            onGoCalendar={() => goTab("calendar")}
            onGoLocation={() => go("location")}
          />
        );
      case "conditions":
        return <ConditionsScreen scenario={scenario} onGoWind={() => go("wind")} onGoSea={() => go("sea")} onGoTide={() => go("tide")} />;
      case "forecast":
        return <ForecastScreen onOpenDay={openDay} />;
      case "dayDetail":
        return <DayDetailScreen day={selectedDay} />;
      case "wind":
        return <WindScreen scenario={scenario} />;
      case "sea":
        return <SeaScreen scenario={scenario} offline={offline} />;
      case "tide":
        return <TideScreen />;
      case "alerts":
        return <AlertsScreen scenario={scenario} onOpenAlert={openAlert} />;
      case "alertDetail":
        return <AlertDetailScreen alert={selectedAlert} city={location.city} uf={location.uf} onGoConditions={() => goTab("conditions")} />;
      case "species":
        return <SpeciesScreen onOpenSpecies={openSpecies} />;
      case "speciesDetail":
        return <SpeciesDetailScreen species={selectedSpecies} city={location.city} uf={location.uf} onGoDefeso={() => go("defesoList")} />;
      case "calendar":
        return <CalendarScreen onGoDefeso={() => go("defesoList")} />;
      case "defesoList":
        return <DefesoScreen onOpenSpecies={openSpecies} />;
      case "more":
        return <MoreScreen nav={nav} />;
      case "settings":
        return <SettingsScreen />;
      case "favLocations":
        return <FavLocationsScreen onSelectCity={selectCity} onOpenLocation={() => go("location")} />;
      case "errorUpdate":
        return <ErrorScreen onRetry={() => goTab("home")} />;
      default:
        return null;
    }
  }

  return (
    <div className="layout">
      <Sidebar
        screen={screen}
        scenario={scenario}
        offline={offline}
        onSetScenario={setScenario}
        onToggleOffline={() => setOffline((v) => !v)}
        onJump={goTab}
      />

      <PhoneFrame dark={darkStatusBar}>
        <div className="site">
          {offline && (
            <div className="offline-banner">
              <Icon path={ICON.wifiOff} size={17} color="#7fd4c5" strokeWidth={2} />
              <span>Você está offline. Exibindo os últimos dados salvos.</span>
            </div>
          )}

          <div ref={scrollRef} className="scroll-region">
            {showStdHeader && (
              <Header title={headerTitle} hasBack={history.length > 0} onBack={back} sub={headerSub} onSubClick={() => go("location")} />
            )}
            {renderScreen()}
          </div>

          {showNav && <BottomNav activeTab={activeTab} onGoTab={goTab} />}
        </div>
      </PhoneFrame>
    </div>
  );
}
