from amy.lib import logging

import discord
from discord.ext import commands

from amy.cogs.debug import DebugCommands
from amy.cogs.education import EducationCommands
from amy.cogs.fun import FunCommands
from amy.cogs.game import GameCommands
from amy.cogs.roundtable import RoundtableCommands

logger = logging.getLogger(__name__)

intents = discord.Intents.default()
intents.message_content = True
intents.members = True


class MyClient(commands.Bot):
    def __init__(self):
        super().__init__(command_prefix="amy!", intents=intents)

    async def setup_hook(self):
        logger.info("Setting up cogs")
        await self.add_cog(DebugCommands(self))
        await self.add_cog(EducationCommands(self))
        await self.add_cog(FunCommands(self))
        await self.add_cog(GameCommands(self))
        await self.add_cog(RoundtableCommands(self))
        # logger.info("Syncing commands")
        # self.tree.clear_commands(guild=discord.Object(id=1437520422160826430))
        # self.tree.copy_global_to(guild=discord.Object(id=1437520422160826430))
        # await self.tree.sync(guild=discord.Object(id=1437520422160826430))
        # logger.info("Commands synced!")

    async def on_ready(self):
        logger.info(f"Logged on as {self.user}")

    async def on_message(self, message):
        if message.author != self.user and message.guild is not None:
            logger.debug(
                f"{message.author} posted in {message.guild.name}: {message.content}"
            )
        await self.process_commands(message)

    async def on_app_command_completion(
        self, interaction: discord.Interaction, command: discord.app_commands.Command
    ):
        logger.info(
            f"{interaction.user} executed {command.name} in {interaction.guild}"
        )


client = MyClient()
