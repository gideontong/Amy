"""Educational commands."""

import discord
import json
import os
from pathlib import Path
from discord.ext import commands

from amy.lib import logging

logger = logging.getLogger(__name__)
logger.debug(f"{__name__} initialization started")

BIBLE_KEY = "bible"


class EducationCommands(commands.Cog):
    def __init__(self, bot: commands.Bot):
        self.bot = bot
        logger.debug(f"{__name__} Cog initialized")

    @discord.app_commands.command(name="verse", description="Read a Bible verse to me")
    @discord.app_commands.describe(
        book="Book of the Bible (ex. Revelations)",
        chapter="Chapter number",
        verse="Verse number",
        version="Bible version (default: KJV)",
    )
    async def verse(
        self,
        interaction: discord.Interaction,
        book: str,
        chapter: int,
        verse: int,
        version: str = "KJV",
    ):
        """Fetch a Bible verse from the database"""
        module_dir = Path(__file__).parent.parent
        bible_dir = module_dir / "static" / "bible"
        if f"{version}.json" not in os.listdir(bible_dir):
            await interaction.response.send_message(
                f"Sorry, {version} is not a version I know about yet!", ephemeral=True
            )
            return
        with open(bible_dir / f"{version}.json", "r", encoding="utf-8") as fp:
            bible = json.load(fp)
        # TODO: Fuzzy matching for book names
        if book not in bible[BIBLE_KEY]:
            await interaction.response.send_message(
                f"Sorry, I couldn't find the book {book} in the {version} version!",
                ephemeral=True,
            )
            return

        chapter_str = str(chapter)
        verse_str = str(verse)
        if chapter_str not in bible[BIBLE_KEY][book]:
            await interaction.response.send_message(
                f"Sorry, I couldn't find chapter {chapter} in the book of {book}!",
                ephemeral=True,
            )
            return
        if verse_str not in bible[BIBLE_KEY][book][chapter_str]:
            await interaction.response.send_message(
                f"Sorry, I couldn't find verse {verse} in chapter {chapter} of the book of {book}!",
                ephemeral=True,
            )
            return
        verse_text = bible[BIBLE_KEY][book][chapter_str][verse_str]
        embed = discord.Embed(
            title=f"{book} {chapter_str}:{verse_str} ({version})",
            description=verse_text,
            color=discord.Color.random(),
        ).set_footer(text=bible["meta"]["fullname"])
        await interaction.response.send_message(embed=embed)
