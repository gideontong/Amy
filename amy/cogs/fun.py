"""Fun commands for trolling."""

import dataclasses
import discord
import functools
import requests
from discord.ext import commands
from typing import Optional

from amy.lib import logging

URBAN_DICTIONARY_API_URL = "https://api.urbandictionary.com/v0/define"

logger = logging.getLogger(__name__)
logger.debug(f"{__name__} initialization started")


@dataclasses.dataclass
class UrbanDefinition:
    word: Optional[str] = None
    definition: Optional[str] = None
    example: Optional[str] = None
    author: Optional[str] = None
    thumbs_up: Optional[int] = None
    thumbs_down: Optional[int] = None
    sound_urls: Optional[list[str]] = dataclasses.field(default_factory=list)
    written_on: Optional[str] = None
    permalink: Optional[str] = None
    defid: Optional[int] = None
    current_vote: Optional[str] = None

    @staticmethod
    @functools.lru_cache(maxsize=1024)
    def search(word: str) -> Optional[list["UrbanDefinition"]]:
        """Search Urban Dictionary for a word and return a list of UrbanDefinition."""
        response = requests.get(URBAN_DICTIONARY_API_URL, params={"term": word})
        if not response.ok:
            logger.error(
                f"Urban Dictionary API request failed with status {response.status_code}"
            )
            return None

        data = response.json()
        if not data.get("list"):
            return None

        return [UrbanDefinition(**entry) for entry in data["list"]]


class FunCommands(commands.Cog):
    def __init__(self, bot: commands.Bot):
        self.bot = bot
        logger.debug(f"{__name__} Cog initialized")

    @discord.app_commands.command(
        name="kevin", description="Define a word using Urban Dictionary"
    )
    @discord.app_commands.describe(word="Word to look up")
    async def kevin(self, interaction: discord.Interaction, word: str):
        definitions = UrbanDefinition.search(word)
        if not definitions:
            await interaction.response.send_message(
                f"Couldn't find a definition for {word}!", ephemeral=True
            )
            return

        definition = definitions[0]
        embed = discord.Embed(
            title=definition.word,
            url=definition.permalink,
            description=definition.definition,
            color=discord.Color.random(),
        ).set_footer(text=f"Powered by Urban Dictionary")
        await interaction.response.send_message(embed=embed)
