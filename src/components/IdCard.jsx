import { useEffect, useRef } from "react";

const BARS = [
  2, 1, 3, 1, 2, 1, 1, 3, 2, 1, 2, 3, 1, 1, 2, 1, 3, 1, 2, 2, 1, 3, 1, 2, 1, 1,
  3, 2,
];
const INFO = [
  ["Specialty", "React & UI"],
  ["Work", "Remote friendly"],
  ["Stack", "HTML · CSS · JS"],
  ["Status", "Available"],
];

// Photo of Numan used as the ID card avatar (base64, so the component stays self-contained).
const AVATAR_SRC =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCADwAPADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD56oxRS1sQNNMYc08009aRQgr2j9nAA3T/AO/Xi9e0fs4j/SW7fPWVX4S6fxH1XZc2yfSlu1zbt9KLMYtUHtS3X/Hu30riOrqeb66CL81UU1Z8Qlv7QOKpqT60hkwPNKDzUa54p4yTSuOw4Ng15v8AFjmym+hr0bIyRuBI4PPSvM/irdWohkia5i3nI2+YM1dPcia0POfAfGrD617zpuTZJj0r540XV7DTL5ZQ7TkH5lQfpk16Lp3xasYAsEmhX3l5A37lH/1q3nCT2RjFpHo0helRcjmud0Xx/wCG9Vufs3mTWcx+6LlNob8QSK6ZgGUMvQjIrJprc0TuRMq9KjZPm9qf5bbs0rqcdaQEls6qMGojctFdbozUErlRxmo4WDS5NNILmlearMwRSSRXceDiXtAx7ivO7sKQoA5r0XwWhFiv0pNFJm+V4oY8YqTFQyVIwz6Ug65pFGBTqAsZ2ur+4zXP85rf1snyMViRjOaYI+D0vGJpxvGA61WsYXnlCDoa220YiLcR2611udjkUWzL+3N60v201MdNpP7P9qOYLMi+2mvb/wBmq533Df79eLDTxXtf7OVn5Vx/wPmoqS90umvePrKyObRPpS3I/cN9KSxGLRPpTro/uGrlOjqed63GpvmPU1U2DFXNa/4/2qrzikWNAArI8WazHpGmtKMM5xxnGORzmruq30Gm6dcX906pDBGXYscDj/OK+Y/G3iKbxLrUhlu2WEKTs3kDA56Crpw5mRKVkdn4w+JshgltNJnddufNKx7dvPQEE5+teWXN9LcTvcMrSSSZZndiWY/jVSeYfZ5IYS4UsNwB646VXtIZppUEPzsOq9ya7YwUVocspOT1NhWSW2LyWzvIoyqgDj1+tS2p1iWDylknEMalyucrj+9j8qfZyStbvbm3RXbhTuOc+nTGfxFZ9zeX1nOksoeONV8sx56Dvwfzp8wrG7pcd7aWoupYUa3kcxvuHRvVfT3+tdf4c8aapY2lsquJsuQxYhmdVPC5P3epH4D1rziXX57yZZCQiHOUX7nTnj361BBqEsc6XS/MqH9/DnG8dyPw/Kk9dxp2PqXwx4l0vxBC5sZWE0WBNBINskZPqP61qydcYr530zxHdeHNebUtMKSo6ceeNzPEcHaxHcHHPvXqfg74k6T4jkWA2z2lxkB1aRSMnuB1IrCVO2qNVK51lzGSpNQQwNurUljG3FMiADYxUJ2G1crpC28bq9I8JALaKPauFkAxmu28IMWtAfaplqVE6AkVC/JqXFNcYFSUMAyM0mKUH8qUj1pgZmuD91WNGK2dbB8s1jR9aAR8U6RYCJ1dhitfUZ0WDauOlVy2FwOKztRlcqRzWtuZ3MU7IYZ1prTis/ec9aTca05SLmh5wr2v9nE75m/368E3mvd/2aDknPXfWdRWRdN+8fVVn/x6p9KS6B8hvpS2Y/0ZPpTrgfuG+lYm3U891pf9OJqsuMVc1w4vD71SBXvjFTcqx5r+0LfQw+BGtSxDXN1EowcZAyx+o4r5qG5fMkSQEsvY8jnkV6r+0PqbLrNtpM8gljtt0i5ByA3QEe2OtcF4H8M6r4hvp2toVFtEnzzH7nsB7100/djcxknKXKjB81lOSFwx79Qa2dPtUeWNpQUVyv7yNuRnoRW7qHgXUpLuO2jsJNw+86fMv6D9Kvy/B7xlFbC6sYZnXGRH+vrTeJgt2WsHVeqic1qKXaXXn+aZJNoU7P48dCff3rMuYtSmdjNazt/vc5/DrXSXWg+KNPnjaTR9Ut3+6+IiQPcEV6F8PfA+t6tZF49J1FY3YCS4kgKgY6gFsEmh1opXTFHDTbs0eUaV4R12/kItbCQD+IsMDPp9a6uH4UeKDAjm08qRsfM/AX619U+FPCaaVpRgayGXwSsmDj689c81oX0CR27qwUHOWB5HNcVXGTT0PVoZbTa94+LfE+g65oPk4ySihCwByp6YI/Suf0q6lstajkUvFKsgZlx91hzn8+1fW/jvQYb/AEuWExiQ5D4zgj8a+cbmbTofFG7UrHc6uTKu7Afk9f5ce1dOFxHtVqcGOwvsJe7sfR3h7UDquhWWolGQ3MCSFSMYJHP61dA+bNcr8LNR+2eG/J+Yx2shjiY9CnVcH6EV1W7mnJWZzLVD5T8ldz4P4sV+lefPIS2K9E8JD/QF+lRLYpbm3nmmnmlagHipLGkUg5pzdKRRQIoazjyawQRzW9rCnZisTy+tMZ8bLHk4NQ6jbfIeKvsVVqr6i+Yj9K0TdzJpWOeMIoMIqY59KQ1pdmZAYq9z/Zrjw5/368RzXuP7NxPmHH96oqfCXT+I+p7X/j2T6UXJ/cN9KS1/49k+lLc48hvpWJseeeID/ppFUQSBWjri5vTVLy93A/OoLPlr47XH234mX9uoHyeXGxHPRB/jXsXgXw+NL8P2GmIoBMYeQAY5IzzXjPii2mufjNcwTbS8+r7Gwc8bx/QV6n4q1/V7rXm0fRI2DIFMjrxk+n5VtU2SHh7JuVj1OzgigCq/lKvHHFdVpUVsYlG4Djj0r5/uvBnxFubcX0erxxNjcIZJcf8A1qNA8WeLvDdwtnrhYwg43Hn9a82dOO6lc9uFeWkXFpdz6chsYzArjBIP3scg1LAGdlVQGAGBnpXAaB4sF5Yo8MpbcATg1YuPFf2IOTKFIGRnvWca8dNDV4aTTdzvLmHy4mOV3e3auZvIny2Qc9+K8j8TfErxZFqKjSpjdh2x5Yh3flitrw5481qW1b+2dPuLdiDgvCVDevrit5QVRXRhCr7N2Z0V5EsjOsgBUjBHrXyh8S7u2g8QahaQwstzFJ5e5ucKG3fnwBX01Z+JdN1eXFvIFnA5jJ5I9a+dP2g9O+yePGuo/lE8ayHaMZHTn3yDWuDvCo4s5cxaqUVOPc7D9ni5mn07VISGKI0TgkdypBH6V6wqnvXm/wCzqsf/AAhE8yx4aS8ZS5xlgoGB+Ga9LIyK7Z7njrYiZBuzXoPhFgbED2rgG4Fd14OJ+yj6VD2Kib7CkxxUhHekxUlETdOacp4okxtpozikBU1bHkk1hq2citjVyRCQelYkY+amM+No9z0l4pEZz6VuW+kktjBqvr1kbeM8YwKaqJuxLptI5RutMYcVIetNNbmBGo5r3P8AZwwjc93rxBRXuP7OK5kOf71Z1Ni6e59Q2rf6On0ptxkxNT7Qf6On0ouuIm+lYm3U4PWlxeHmqqDHPpVjXSftvFV0J4BPeoKPntvD9zbfHu482IY+0yX0HcGMqWH6nH1rpvEKa5pTSXWnWO25kOWlYgBffNHgSC/ufiNqV7q8oubqK3ECSEYJUyMQSOn3VFe322l2E9kbe4jWXzB824Z3VNed0mejgqHvSifPAj+JF+8LWOu6dZs6sZvOw30G5gxIx9K7bSvA+p3MCR6re295YTQc3SFVKzhckbBgbScgMMHpkV6TH4D8Pxy+ZDpVsGHOduat6hbRWlusZChV6cYA9hXJUqtxtynqU8NFSupO/qc78LPD1vZxi3nPyhsYPXFafjLwxHeuY7YZO7CjNbHhWyd7j7QybQxyue9aeowiK7LNkA9RWDh7t2a86VSy7HgmvweL9GhvLnRNMK/Y0DpHtxJc84+Tgk+vOKg0v4p67cafKviXw3eWcMEgiMs8eUYkdxjen1+YDvXuOueE7TWUSSYzIy/dkicq4/Ksyz+Hlskm6TUb+4H92XaR+eM11RilG3Kck25S5lP5HB+H4tI1S8h1vTvkCgllyMqSMEcda88/aLgi8/TbpkVh5Toc9cEkD8e4r6IvNBs9Pjc29pCmRgsqAGvCvi/pq634o0TRWuobYXIZXkmOFjVWyzk9sDNVhpNVfe6GONivYNR62L3wGsWtPhnpznO65eWc8erkD9AK78DFVNGfSTpVsuhTGbTY4xHbvs25Vfl6enHXvVrdXoKSlqjwZQcG4voI4ru/B4H2RfpXCZzXeeEObQD2okC3N89KY3Wn4NJIABUMoiYE0qYFNZ1HfmoWm5wtK47FbW3Cw8msSF06lqva4kssRwayIoXVeTQrhY8NW0VJPu9K57xsgFu2BjiuzdQZOlcp45TED/SuSj8aOmr8LPMyKaQalI5pNteoeaNQV7j+zhku/s9eJqvNe3fs6g7zj+/WdTYunufT1n/x7p9KW65haltF/wBGT6Us4/dN9Kysa3OA1lf9NNVgvP0q5rfF8aqqO9Q0WeX6JLFZfEbxDBHJllMQzngY7frXqujajGwDM33jj6V4NfXMNj8ZdaiOVWWTnJ/vKCT+depeHLlgQjODg9fUe1Y4pqKSXY9bLm5Nt9z06C9T7OScYx1zXBeNfF+g6ffO+r36wRW6g4Y8ZP061oz6nb2MO65nSNPVjgV5h8SrrwncqZ5IY7663ERfN0YDOMjtXNRvVfkehXlCim76nr3w68f+HNZtEnsLy3uUTg7H5/8ArVd1Txh4W1PUprCHWLNLyP70SzKzr7EA5FeJ+DvAFvfWf9uQz3NqNp86K2QoXKjlc/1q5pemfDW81loZNBOmT26AmWOQpIz55LE81s4N3itTlUkmqkla59BaDqlq9ukdwVJI+VlNaF48CITHJ+lef391p9lZwLalIljGxFzkkDtS2+stLGNs7FcdM9az+sOC5ZI1+pxqPngzT8QXaCCRtwPHSvE7mytfEnxW0bTry3FxAsE5dSOCCp/PtXeeJdS8uzleRsLj1rz/AOCd2dR+Kmp6i2XjsrNwATwpZgAT6DAJp0LyUp+Rli2oyhBd/wAju5LS3ssWdrGqQ26iJFXoAoxTNtSTSeZK7/3mJ/M1Cz7TXpwjZJHz1SfNJy7jgMV3PhDi1H0rgJbmNBlmrtPBk3nW4KnjFEtEKG51LSBar3ErMMLUpj7nrShFA6VkabFRY2Iy2alSNQc4p7e1CDmnYLlHVseTx6Vz43FuldDq4xHWMgGM00I8W6y1zHj0D7K/0rqCPnrlvHmTaufauWkveR01H7rPMWHNApaBXonnDlFe3fs7DDk/7deKR9K9s/Z6Pz4HXfUVNi6e59P2v/Hsn0ouP9U30pLQ/wCjJ9KLkjyWrM1OC13P26qqnFWtcyb0+lVYxxUFHzv8X410j4oNMGc/akjmDN+IIHtkV6D4D8SW0sUKXDJlmAXnt61j/tPaFJcaLZ+I7aPc1gfLnx2jY8H8GP614roPiC6troTFvlRiQp6elOpQVWCXY3w+LlQqX7nsfxBtfF3jPVJk8OxolhCx8uSVyqsR1571b+H/AMPdWiYPrdzaoQ+9kQM3ze564qr8MPiAZCtvekLCrbVToAD3+tenXUd7eWhuNIlC+Yfkydp4rlk50lyNaHrYeVKrP2u7NPS9B1rcI7Kaw8tjtwkrJ+YrO1TwdJZy3P8Ao+npdXH+skEpbdjoCCOaxLOw+JSagkcWpRNExy3yA7PYZ6/Wu4s7fxEsKpqZg6YLp1NZyqRgro9J1vaPlktPQ8n8T+GfiLBbPeW1lbNbREtIYLouzZP3gpGfqM12XhMC08MQ3N7cMZ3Ubg/XP0rp9b1uHTdAm+0MEG0ry3U9B+deReOvEjLp6QiZj5a5dxxkhc8VDUq6SscPPDDzlK4nxH8SAxSW0TgqxwwH3sYzkCrHwF+xad4f1u+mtpjc6hJ5UTkYVogPXv8AMT+VeKw6vcaxqHl+Y7TTOI1ye+ef1/QV7ZYSx6bpVtp9v9yCMICO57n8TmvSjRUIcp4VXFOdTnOrmvYol+8M1g6prZB2oayZrm4lPUgVHHbeY2X5ra5xjbzWJ5BtQE17D8KzI+mRu55K15Otmg7V6/8ADbC6fGo7LUTTLg0dnzQelGcCmkk1BY3FKMYpKU0xFLVxmKsJWHStrVTmIisJUOc0xnkZTMmK5Xx/FttH+ldmF/eVyvxEA+xv9K5qb95G817rPIj1pRTmHNIBzXecBJHXtf7PAzMx/wBqvF41r279nZMSMT/fqKmxpT3Ppm0H+jp9KLj/AFTZp1r/AMe6fSmXJ/dn6VmadTiNaUfajVIcVc1ok3ZxVUISKhlIo6vp9pqum3GnX0YktrmMxyKe4Ir48+IPhi78IeJ7nQppVlCASRSg4Vo25B579j7ivsjUJorO0lurmZIYYlLO7nCqB1JNfP8A8WoNO8ZtHrFm7NHJGpgmxgso45HpkVpTly77CcHPbc808PasbVkYMoAAyx6Fs969d8B+OEj1CC4ubgSBFO0MxG0euPf0rwm/sZ9Mm8uZW25zux8tTHVfJixC5BAxkdv88VvOnGoiKVedGWh9eaj8SbWG0hliaDeTygfGB3zWdqXxbie3cRP5keNqEdQcdfpXyZLrt7cFhJMxB42g9KsW2uyW4Ko7KWwHOPfkj8KwWDgjqeZ1GeteNvH806PGlz5iyZdkbnJx2HvXm2reIrrUlVPNfyuRtBOO3P6VjNey3VxvUAZOEXk12HgTwZdazex3FxG8VrG4LD19q0ahSjc51OpXlZHT/DDws6aQPENxGyqZvKtgw5PBLP8A0Fd/CPlrcvLGLT/Cun2UKbVR+n4VlLHhazoz9rHnDE0/ZT5Bm2pYsLSAdqcBzWyOdiyuAma9V+GeW09D7V5RIm4Yr1z4art02P8A3ampsVT3OwNJinGkBrI1ExQwoJpAeRQMoaoP3ZrHUjFbWqD90axVFMDyhuHzXI/EHJs3+ldrLFhsVyHj5QLRx7VzUl7x0VH7p5ERzSqKe64JpAOa7zzyZBwK9r/Z9yRn/brxaJSele0fAB0hDNIyqgY5ZjgD8aiaui4PU+lrJibdPpTrj/VEV5x4k+Mngvw6Ps8d3Jqt0oOYrJd4GBk5foK8d8d/HPxBrrG30r7Vo9m2BiFFEj5/2y2R68YojRlIqU0mezeK9U03S7gy6jewWqdvMfBP0HU/hXnviv4t6XpMZh0qze+uCOspMUaemerc+mK8Kl1m/u7p5jLIHbAN1PL5spy3UZ4U+/NZvmySZkeWWTdIWZncsSOgzn2reOHit9TOVZvY6z4mePPEOt+HZrG6vVxOdzxQJsiQdlHdvqTXUy6dbWfhzTbG2DNDFZRIpPU4UZP1zk15LfMLjdCxHIOCeleqeE9RXVfDFoSR58CeVIPQrxXPjFaCtsdWCd5u5yOq2G+U7gGQjHIzmsi58P6fcKRLaqrf3kODXol7YrksqDPesp7PJZcYI9q4o1mjtlQTPOX8LW6SExSzY9Min2vhHz7lI40mkZj0zXfxaHc3UqiAck969F8J+EY7SFJZkPmEZZj/AConjHFbhDBKb2PPPCnw0eOWJ2VUzyVA5H1Nez+HfD1tZWcdusSoFHzgcVuaXp8EaAbFX6VrmJVACqB+FefVxM6j1PSo4aFJaHl/xus9Ti8HxarpLlTpVyl3MqtgmEAq2PXG4HHoDVHRtRg1KxhmVkWVly0eec98D0rrfi7PHa+BNUSRgDcwG2QH+IuQP5ZP4V4XazCO1SEsdo5VlJyvuDXrZe26VjxszS9rc9UEftSFcVzfh3xXDJ5drqGVbaQJv72DjmuqHlyoJYmV0PRlORXY0zziEjjNesfDnP2CP0xXlkqhUzXp/wAN3JsYx7VE9i4bnaMKbTpDxUYNZGgHpQOKKKAKup8w5rFTHIrY1I5hrEBOelMZ5nct+9rjPH5/0V/pXcTQ5m6VzXivS5L8GBZI4geryHgD145PTtWFLWSNqnwnjLDOTWtpHhjV9TiFxBbGO15JuJCFQAdTz1xXa2eneHfDnlu0TaheliGkkACqVAJAHQdh3PXmqGsaxcaishMhAaNU2g4QZbJ4Feiqfc4GytbaXomjn/SZ4dQmA+YNkqoIyMIpA3dOrHr0qtqmpZcW8TSSwrIoRWwiAgckIuACc+/AqHUFAmmJZcnzcfhgVUuVTzidpz5p6d+P0rRJLYLla+eV43kaUHKscKoAyT0AHA6VnXieYcbiAzHjGcYFaM5ElsyhflGwdPc1SlUlSF6jcemSfpTQikihWXO07QuMHvyaiU7iUC4BVShzntzVxogr7VByduMj261DLENigsEICdODwadybFS5BVVZuSuRjNTaJrl5pF2ZbV+G4dD0amMrSOUkADBiB2DVBLZuCSEzg54NZySkrMuMnF3R6t4b16y1pViDhLno0THnPt612H/CHyS2v2hRg9cd6+eITPCVKggKcgg4Oa7TQviX4u0e38iHU2liAA8u4RZQMfXkfnXl18DJu9NnqUMfFK1RHrtjpM1si7DnbyflrqNLhlKgSAsMeuK8XsfjPqyDF1p2nzEddiMhbjrweOavW/xp1JBsj0ixDDOWdmwSMe/vXHLAV30O1ZhQXU9/tSkafcVTjsKzPEHifSNBs3utUu0hC/dTOXc+gXvXgWo/FbxZfpIsd5HabkyotowpUnORk5PUVyd9dXV9O011M8rSA7i7EknjqTWlLLJN/vH9xnVzWNrU0dh488aXHinUVba0FpCT9niDA892b3/lXMI7bCz/ADYJP/1qq2yFCTgknkZOKuRbk7qjYx+nWvYhCMFyx2PGqVJVJc0tzJ1Ry96VV2VolADISpBJLH+lanh/xVq2kzKSTcxDgjoce46H8PyrEyZ5HnIx5jFgM5wOg/QU4KQeBWhlc9b0/wAbaZfQZkHlYABKndg+hXqK9w+Fl1aXemo1rcxTbQN2xgSv1HavjqC5mt5t8e7lM/L3INdPpHiO6sriG5sLyeznRlw0R2FM89vf1HSplTUkXGVj7XkHFRAV494E+MwnjitPEVuznOw3UQBYEHBLqPT1H5V6zpmoWGp2iXenXcNzA/R42yP/AK341zyg47mqkmWTSHpTsA0jCoKKWo/6usbvW1qXEJrFXnNAHn+p3VvZoZpWUHB2r68dT7Dua8x8ReJDOZY4pQHZfnfbgnaQD9APm496b4z8QTzO0TyIssg2thcBRzhc9wN2c+tcKlwzk7xhn+V89VJ+VvyYfrXTQpKmvMzq1HN+RpXVy9xcnLOzLJIeTwSR1p1rdDy2iLbsqre/XpWZ83nK5YBxtY89M/Kf1qdS3kmTIA2MMEcjaf8A69b3MTQuyTHKePk8zP4sOKiby2chmz8549crVUTFlmjPcyg4PoAc1JCd0hDOy/NjIxz8v6UrjFOPs4CbRgINvY8mqgBWLIILYbjHfirjoRGrMcsdmR0BGaq42oVOBgPkE9s9BQBXuSytuJYAsp68E4quY1McpJ58o4wfRqsygO4Ytx8owDjtUCIFUlhztbg9+aBFdogylWBPLdfoDmpER1Rc4ZTsXGcNyM9al2F3IHGXOMn/AGaeihgmQBzED6/WkMqGONnIchSeQrHHH16VIbPdF8qEljgkDgdgT9eaI4MqwLYGx88/7VPlHlGRjErbA6t5YKEjAAPHvSArPYqJvlYHpkHvk1NFYqsgkBBVtxAH4f4VLIpaTbGsv3iQwkOQQKdDKqowzKFwvPmYOSeaQFiCyi4Y5BGRkDjswP8AMVMYreNd7yqPbr/nv+dQZ3vIgyT84CuxIwBTRATEoLYVdmV7HOaLDHvKEmx93G4E9xgenTrUV5L5Vo+Askkx2Z5yGIGT/P8AKkjhzuYHd8uSc85L0ydC93GgYbI97sP9onA/TNCEyJVC/Ko+UcD2FLjvU2wfSlji3Oo7UySONVPzlAdu8E56AAVZaHcitubCRo365zUYwIW5IG18nHX5u9Ojch/mzyyLz7CmUaHlqsjTRO2d7856Armui8KeNdd0LUIp4JmDYRS47qcg57N0HX0rmI5eNpYnmRs+hxinxkjAYFmJiOQemAc0BsfUXgT4qaFrltDFqEgsLsjDb/uE+ue38q9CRkkjWSN1dGGVZTkMPUGvh6OXyeUBTEbke2TXpPw3+ImqaBeGF3NxZPJl4HJwRtydp/hbrz0PesZUl0NIz7n0ZqgHlViIcEir1nqtlrejw6jp8m+CUcZ4ZT3Vh2I9KpSKVORXOzVHxjeXbXE7uQSg7eq44/Tj6rVfzHafCsCx+8cdcjhvxwD9aWMLtkZsoARkf3fcewOD9Caisci9eJztZTtJx90H7pHsD+hrvOYtxssjEHLEoXXH0zj8wasu2+Mr6Mw6/wB5QRWLc3DW9+h5C+YR9M9R+f8AOtUfNGCJAMhSOOvAOP0oAhtWDvJz95XJ9M+X0/MVadylwmQTlugPT5O9UPN8q92nC8lTx2wwFXGIJjmbIzsyR6mM0gLpm2wAKP4UBGO9Rn5wQoBO5xk9OnU0oRWiYIR8sQJOe+BUUX+sK7d485h7YxQBCq7jhgSuE6n26VDdI6+cOVA3jBIyOalkDmIDG1ii49eo9aLkLNPIByR5nT+dADYVO4FgMeZ0/wCA00MUWNsAgMg4HPWlTMZDggqHXP8A3z6VGgUhXIHBj/EUAPZCQmD99eo75enuAyytxwpz+L4zSIoxGy5AwvB75fNJC3O0LjJT9XP+FADAQZpWO3DM2PU9uKjYMh2hcDCgH8vWnyDaofnLoeAO5ak+bc+OVYDn8R/hSAkQBZSVLDHmfjwKsRsGkjZUJO6P8fWqaM4ecE5TLBQB06VZhYxTKJFb5XGSOo2rQBMkarGpyNpVMH/gZ61Us8yLNO7ZMsrFf90Egf1puozEaftiDeawjjQ55yc4/nVqOIRxpEnKooUfQUCYziljwGQsSBu/lTyuaFfC7QTxu4wMEgYoBEYVPLjUEEMFXJbpk0TFDIrKDjLn2x0FTMxE6EtkqT0HQKvSoXDFSrDBjjUc+/NMYqIW+YgqpCgjGSdxJqy0xwWXL7C5z1PAwKhR4yqhXbKsxJb0VQB+PWmMhVlhDEA7VJYYzn5jQBLGzEDa5yVRSD24ycfkavWruEaZZBkI7D5cYydorNRtz+bGT8+SAR0JOBz9KsF/KhBTccNnHqFPH5tSGemfCPxpNo161rO5eynlIkQAcjhQ4z3HP1Fe7s6uAyMGRhlSDwR2Ir5C0uZoZ0IG0Btu7P15/Ms34V738HvE6ajYHRbmSMT2yb7cl/mkj6kY/wBnI/A1jUj1NIS6HzVZuoibgjBAGedvB+X6H19Kqy4jvN2CQEIYHjKdCD7j+gqzDILgCeAD5lxJESMk9WH58iotUYQy20yyYORksB8wPTI/QitzEy9cbKFtwZg2Qw65x1/HH5it+1k8yzi6g/Z0OM5zwa5vWxtldF+UZyFHb1X/AAresGYWsGDgGFR1oAYxxfCRsM25Tgjrk4/rUk7/ALmOUMMqqA47dRUN0wNyH5yqpj2wRx71XMmY0iILMoH4AHv+dAzYtJ3WIg7ivlDnPQ1LE4Mw3ZQCQNn6j/69U7F1dCAcYRcgc549qsFVEihsE4Q+mRigBXX/AEcHk71UY3dBuH5dKhQFjJISS3z8496VnjKqFOeMEZz0b9amiR1UyHGD5gGD16HNADZFAj+dD95Qfb5aqBCrKEwCjIRjByMVoxkMgXP3mXHfqpqs6FfL2gZ/d4/I0ARwvtkji6AhMNjjqTSwkBlI5y0Y/Umq0mS8Y5xtXA/PmnwTfdyB99ORjPC/pQBeRFktgpwAqE+/DdqbPGokZBGD86oOcfWmWLp5KqwLDyiePXcKZcyFijKQygFiV9Rn+ppAIVYyvIoba8h646DrSuzG3LqATsZjgf3jgU0biBEGwcBOOM55J/IUzUbr7PYuyITK2Nn/ALKMfUj8qAEsx52qqpU+Vb5YsRxuwFUfXqfwrUl2joPar+srLpl7HpOnanPZ3GlwC1uYJXR0kn+9MSuCjAu2ORkBQO1UFvFlcJqWmG3bPM9gMrj1MLHH/fLD6UXENQ98ZA5qONSxVdoA4+Yepbmp722C2qXFrcwXlo0vltLFkbGClgjqwDIx64I5AOM1XiJ3RE4UAIOmB60AkDkiRjuXBEmDjG7JxTmO2Q5wf3nIx2AFMXBPJVspjhsdWJz6ZqW4XKl1XOFkYDr3xTGVWV3KncVJQAf8CNLPdEsUJCnBZOO7HA/QUtwzxyBExhc8n/ZXH8zWVM+y9ZRncDxg9MDA/UmkBt6cu9dyp/D8uPX7q/1NM+XzFVMkrgLnn2X9cmkSZYbJpF5ZvlGOoA4GPxzTItqpkuVbkDAzg/xH8Bx+dICw2IioyHjAOMDkjoT+PT866Xwxqc+kaja6tCpEsB3/AHsB/mwQfYkkfhXL/eJwyKwOen3e36D9TWhaSobYxZIK5LAjpgcL+WfxNA0cZpsrqBcphmXPmgtgsvp9a1LpF1Gzby8Meu4nOeP/AEIdCKwBmJpoCAvzZA/lVnQ7hoXZC2TuAZM4z7g9jVCIddkP2WJ3xkDY2evt9fY1d0yd2tYCHO0Jjp0xg1W8TAXFs00Tb0Y56YOfp2P86NED/wBmwtg4I29eOVoEaF5uDK2MfK2fbAz/AEqGeRlQ8kbhgn8c8/nUzoZlQqSQzL+G4Yqo7D7MrKd2Dt6YPb/69IDT0wERkBl52qQOo64P/wBarkS42/PjO3qevXNZumSgcMQgxnj23VeYthCDu+6AfQ4PFAxCrKM5zgHp0Hzd6lSRCfLzxlsd8DFNi2BSMc87j68jinIAJHIIL7yv4baYDreXLoS3QrjHGetLLnyo0GD9zJB9zRH90DG0qyH8cnNRxOwVcgHlMHPvSAryAi3Rgedg789SM1Hago7AspIY/otWUKsrk/3QOmc/OaozKUL7Dwu9jxkdhge9AFtjsgyuCdgGc4zntSumV2EnkBPl5xz7fSoBKGKqcEBlU+uAOlTMWEgaNsHI2469KAG5KytIvP3sH8MVQvLi9i1XT2slUzi7jZNy7lDKQRkHggYzirh+ZMYYYIJBGepP+FS+H4muNSe6kHyQAhcn+JuP0GfzoEXdZttL1e/ubzUbW70W+uJXlkvNOzdWsjsSSzQMfMjyTk7GYf7NVrax8S6ZaS3lkbbxBpsfL3GnP56oP+mkeBJH/wACUfWtmIbXxwBVXU7eKOM39vutr1BiG4hYxyIx4BDKQfU0WAfrl2y6NpdpsWBriA6lPFjaUaRdsYJ7/uwrYPTzPeq0RJuEJ7MOhz0Wqc089yj3V/dTXtzKpaSWaQtI5yBkse+BVkY+0mRC5G48E9cLQMW2X5ogp2hTGBx15NSAsU3FsEjIOOmWPft0qK1crIucHDJkE+gPNRPJvVQpGFVDnpjgn/GgBLhgVJ2rzyCeO5J/lWK7f6UzheTzwe/X+ZrVdysDIRkjAP5DP9axd6/ay/YDceePX/AUAbDSFbWKLcAdwTPsBk498n86Tf5H/LIeYx24z0Hp+HU1HdbkhttpAdoy7H+LJPb/ADxVeJzcTrHhcBc8nGfx9P50gNqIxmFcH5gMrnqT2z/OrWlEPcFJdxiYgcNgk9dv1PU/QCqSfu4/NlZ8Eks2MEccEe/YCptNIjmRiGC5yofnAOf6nOfamCOU1eNob1JD67Wx396r3qNGy3Sn5X+93OK2dXgDJjlievP+fU1lxDzYGhIG4DC5oAbqE3mab5iZJwN/HUfwj61J4e+bTEJyBuHOOOuKzYHKpJbkDgE8nr6VoeHGK6bImSNjE9ODz/8AXoEajHAGCRgKTgdMNiqD/JEyMeMfN6jkj/CrVyRluqj5sD6EGqU7fOWAc4OfvYAOc0AXdP2GUZBdc/w9O9arJ8oZRj92pGe/vWFpzZuEx03D5s89ccVryvJ5KgsxKxjB9Rn2oAc0hCEMCxwxBB75/SrUbMG3bCTvyeM4yo68VmuSuWLZZi+QeCOanhlAZQPlQuCMH29aBljzNxyu3+E/dxkbj3qPkROrMQWAHXr8xqLnsxOSp47jJpA5dvlGBlRz1+8aYDlc4bAVclV6cn5s5/Sop2EiYPyjGT26tUisGeIDAyyjJ6feNSygNbp5WDgoOfqT+IpAU0b955gYqMuRz17U9ZTsJZskb/qOAKjhERGM4G1e/XmoGbhsAElDn8W60ASXchhDh9uEOCc+i+lb+g27W2jwRSLiVh5kn1POPwGBXOWaC/1mG12ZjDNLMf8AZX/HgfjXXM5Zid2O9MQpQhgwLYPrVDVpwWitxIEKNvYDr93j9P51ooy7fnbAAJJ9u9c8z+bJLcMd/msz8/w8DAoGPAR4pNoyNiqAD34qeOXPm7tox5jZB4xjtVRJRuC5KsCo2kfjUkUyPEx3ZYo24H3xSAsDiJsHc/XH0XPP51W2t5uAdpJwOOnQfyBp90SrnG0dRx35A/kDVWR33d84BHf8P1/WgBLncA2RkN1455Oc/lWZbIZrvYRgMQG9+/8AKrcsn7vbuIZhz+P+AqtaIzT8LtLHpj1/l2oAm1OfdeEMCdqAAHsOuD7c/jVvS4GjkZpSm/AYhxwB2Lf4VQLpLeS3ChmBc4JHJHTP6Vf8xxGFlQckhcHgMOQc9z9aALGqXasyhMfezuI+8SMbj7jpjtVqKcbGmBI43kAjkH/6+fzrJf8AeuRnkkjIPfr/ADq8isLLCZBPKZ7buefxoA//2Q==";

// Hanging ID card. Drag it sideways or click it and it swings like a real pendulum.
// Colors come from the site's theme variables, so it turns light/dark with the theme toggle.
export default function IdCard() {
  const swing = useRef(null);
  const s = useRef({
    a: 16,
    v: 0,
    drag: false,
    startX: 0,
    startA: 0,
    moved: 0,
    lastT: 0,
  });

  useEffect(() => {
    const st = s.current,
      el = swing.current;
    const reduce = matchMedia("(prefers-reduced-motion:reduce)").matches;
    if (reduce) st.a = 0;
    let raf,
      last = performance.now();

    const tick = (now) => {
      const dt = Math.min((now - last) / 1000, 0.033);
      last = now;
      if (!st.drag && (!reduce || st.live)) {
        // spring back to hanging straight down
        st.v += (-30 * st.a - 1.4 * st.v) * dt;
        st.a += st.v * dt;
        st.a = Math.max(-30, Math.min(30, st.a));
      }
      const sway = reduce ? 0 : Math.sin(now / 1400) * 0.8; // tiny idle sway
      el.style.transform = `rotate(${st.a + sway}deg)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const down = (e) => {
    const st = s.current;
    st.drag = true;
    st.live = true;
    st.startX = e.clientX;
    st.startA = st.a;
    st.moved = 0;
    st.lastT = performance.now();
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch (err) {}
  };
  const move = (e) => {
    const st = s.current;
    if (!st.drag) return;
    const dx = e.clientX - st.startX;
    st.moved = Math.max(st.moved, Math.abs(dx));
    const na = Math.max(-20, Math.min(20, st.startA - dx * 0.15));
    const now = performance.now();
    st.v = (na - st.a) / Math.max((now - st.lastT) / 1000, 0.008);
    st.lastT = now;
    st.a = na;
  };
  const up = () => {
    const st = s.current;
    if (!st.drag) return;
    st.drag = false;
    if (performance.now() - st.lastT > 80) st.v = 0;
    st.v = Math.max(-250, Math.min(250, st.v));
    if (st.moved < 12) st.v = innerWidth < 600 ? -105 : -140; // a click swings it left to right, then back
  };

  return (
    <div className="lanyard">
      <div
        className="swing"
        ref={swing}
        onPointerDown={down}
        onPointerMove={move}
        onPointerUp={up}
        onPointerCancel={up}
      >
        <div className="strap" />
        <div className="clip" />
        <div className="idcard" aria-label="Numan Anjum ID card">
          <div className="id-top">
            <img className="avatar" src={AVATAR_SRC} alt="Numan Anjum" />
          </div>
          <div className="id-body">
            <div className="id-name">Numan Anjum</div>
            <div className="role-pill">Frontend Developer</div>
            <div className="id-info">
              {INFO.map(([label, value]) => (
                <div key={label}>
                  <small>{label}</small>
                  <b>
                    {label === "Status" && <i className="live" />}
                    {value}
                  </b>
                </div>
              ))}
            </div>
            <div className="id-foot">
              <div className="barcode" aria-hidden="true">
                {BARS.map((w, i) => (
                  <span
                    key={i}
                    style={{
                      width: w + "px",
                      height: 14 + ((i * 7) % 12) + "px",
                    }}
                  />
                ))}
              </div>
              <div className="id-no">
                <span>NA-2026-FE</span>
                <span>REACT DEV</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="hint">Drag or click the card</p>
    </div>
  );
}
