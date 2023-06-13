import { useState } from "react"
import { createStyles, Navbar, Group, getStylesRef, rem } from "@mantine/core"
import {
  IconBellRinging,
  IconFingerprint,
  IconKey,
  IconSettings,
  Icon2fa,
  IconDatabaseImport,
  IconReceipt2,
  IconSwitchHorizontal,
  IconLogout,
  IconMenu2,
  IconSearch,
  IconHelpCircle,
  IconHomeSearch,
  IconAlertSmall,
  IconAlertCircle
} from "@tabler/icons-react"
import { useDispatch } from "react-redux"
import { logout } from "../thunks/logout"
import React from "react"
import { Link, Navigate } from "react-router-dom"

const NavbarComponent = () => {
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
    window.location.href = "/login"
  }

  const useStyles = createStyles((theme) => ({
    header: {
      paddingBottom: theme.spacing.md,
      marginBottom: `calc(${theme.spacing.md} * 0.5)`,
      borderBottom: `${rem(1)} solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[2]
      }`
    },

    footer: {
      paddingTop: "1",
      marginTop: "1",
      borderTop: `${rem(1)} solid ${
        theme.colorScheme === "black"
          ? theme.colors.dark[4]
          : theme.colors.gray[2]
      }`
    },

    link: {
      ...theme.fn.focusStyles(),
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      fontSize: theme.fontSizes.sm,
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[1]
          : theme.colors.gray[7],
      padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,

      "&:hover": {
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[6]
            : theme.colors.gray[0],
        color: theme.colorScheme === "dark" ? theme.white : theme.black,

        [`& .${getStylesRef("icon")}`]: {
          color: theme.colorScheme === "dark" ? theme.white : theme.black
        }
      }
    },

    linkIcon: {
      ref: getStylesRef("icon"),
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[2]
          : theme.colors.gray[6],
      marginRight: theme.spacing.sm
    },

    linkActive: {
      "&, &:hover": {
        backgroundColor: theme.fn.variant({
          variant: "light",
          color: theme.primaryColor
        }).background,
        color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
          .color,
        [`& .${getStylesRef("icon")}`]: {
          color: theme.fn.variant({
            variant: "light",
            color: theme.primaryColor
          }).color
        }
      }
    }
  }))
  const [isOpen, setIsOpen] = useState(false)

  const data = [
    { link: "/page1", label: "Olay Bildir", icon: IconBellRinging },
    {
      link: "/emergency-calls",
      label: "Acil Yardım Hatları",
      icon: IconHelpCircle
    },
    { link: "/Hasarlar", label: "Hasarlı Binalar", icon: IconHomeSearch },
    { link: "/search-page", label: "Arama Sayfası", icon: IconSearch },
    {
      link: "/todo-page",
      label: "Depremde Yapılacaklar",
      icon: IconAlertCircle
    }
  ]

  function handleMenuToggle() {
    setIsOpen(!isOpen)
    setActive("")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }
  function NavbarSimple() {
    const { classes, cx } = useStyles()
    const [active, setActive] = useState("Notifications")

    const links = data.map((item) => (
      <Link
        className={cx(classes.link, {
          [classes.linkActive]: item.label === active
        })}
        to={item.link}
        key={item.label}
        onClick={(event) => {
          setActive(item.label),
            setIsOpen(!isOpen),
            window.scrollTo({ top: 0, behavior: "smooth" })
        }}
      >
        <item.icon className={classes.linkIcon} stroke={1.5} />
        <span>{item.label}</span>
      </Link>
    ))

    return (
      <Navbar h={"100%"} p="sm" className="flex flex-col ">
        <Navbar.Section grow>
          <Group className={classes.header} position="left">
            <Link
              onClick={handleMenuToggle}
              className="font-bold text-3xl"
              to="/"
            >
              Menu
            </Link>
            <button
              className={`transition transform duration-500 ${
                isOpen ? "rotate-180" : ""
              }`}
              onClick={() => {
                setIsOpen(!isOpen)
                window.scrollTo({ top: 0, behavior: "smooth" })
              }}
              aria-label="Toggle navigation menu"
            >
              <IconMenu2 />
            </button>
          </Group>
          {isOpen && <div className="">{links}</div>}
        </Navbar.Section>
        {isOpen && (
          <Navbar.Section className={classes.footer}>
            <Link to="/login" className={classes.link} onClick={handleLogout}>
              <IconLogout className={classes.linkIcon} stroke={1.5} />
              <span>Logout</span>
            </Link>
          </Navbar.Section>
        )}
      </Navbar>
    )
  }
  return <div>{NavbarSimple()}</div>
}
export default NavbarComponent
