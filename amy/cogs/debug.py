"""Debugging commands."""

import discord
from discord.ext import commands

from amy.lib import logging

logger = logging.getLogger(__name__)
logger.debug(f"{__name__} initialization started")


class DebugCommands(commands.Cog):
    def __init__(self, bot: commands.Bot):
        self.bot = bot
        logger.debug(f"{__name__} Cog initialized")

    @discord.app_commands.command(
        name="ping", description="Check Discord server latency"
    )
    async def ping(self, interaction: discord.Interaction):
        # TODO: Differentiate between regions
        await interaction.response.send_message(
            f"Pong from us-sfo in {round(self.bot.latency * 1000)}ms!", ephemeral=True
        )
